import { useEffect, useState } from 'react';
import ChecklistTemplateDetailsMain from '../../components/Item/ChecklistTemplateDetailsMain';
import ItemTopHeader from '../../components/Item/ItemTopHeader';
import { Checklist, Item, ItemTemplate } from '../../utils/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosClient, getItemTemplate } from '../../api';
import { queryClient } from '../../tanstackQuery';

export type CreateOrEdit = 'create' | 'edit';

const dummyItem: Item = {
    itemId: '31232',
    id: 'aslkd-12-lsad-a',
    created: new Date(),
    lastModified: new Date(),
    hasChecklistTemplate: true,
    name: 'Hydraulic Arm',
    itemTemplateId: '9391293',
    serialNumber: '131233',
    type: 'item',
    wpId: '1231232',
};

const ChecklistTemplateDetailsPage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const paths = pathname.split('/');
    const itemId = paths[1];
    //const [createOrEdit, setCreateOrEdit] = useState<CreateOrEdit>('create');
    const [textFields, setTextFields] = useState<
        { text: string; error: boolean; helperText?: string }[]
    >([]);

    const { data: itemData, isPending: itemDateIsPending } = useQuery({
        queryKey: [itemId, 'itemTemplate'],
        queryFn: async ({ signal }) => getItemTemplate({ signal, itemId }).then((res) => res.data),
    });

    useEffect(() => {
        if (itemData) {
            const questions = itemData.questions.map((q) => ({
                text: q,
                error: false,
                helperText: undefined,
            }));
            setTextFields(() => questions);
        } else {
            setTextFields([{ error: false, text: 'create some questions!' }]);
        }
    }, [itemData]);

    const { mutate: questionsMutate, isPending: questionsIsPending } = useMutation({
        mutationFn: ({
            itemId,
            questions,
            method,
        }: {
            itemId: string;
            questions: string[];
            method: 'POST' | 'PUT';
        }) => {
            return axiosClient(`Templates/${itemId}`, {
                method: method,
                data: { itemId: itemId, questions: questions } as ItemTemplate,
            });
        },
        onMutate: async ({ itemId, questions }: { itemId: string; questions: string[] }) => {
            await queryClient.cancelQueries({
                queryKey: [itemId, 'itemTemplate'],
            });

            const previousItemTemplate = queryClient.getQueryData<ItemTemplate>([
                itemId,
                'itemTemplate',
            ]);

            //optimistically update to new value
            //const { questions } = { ...previousChecklist };

            queryClient.setQueryData<ItemTemplate>([itemId, 'itemTemplate'], (old) =>
                old ? { ...old, questions: questions } : undefined
            );

            return { previousItemTemplate };
        },
        onError: (err, some, context) => {
            queryClient.setQueryData([itemId, 'itemTemplate'], context?.previousItemTemplate);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: [itemId, 'itemTemplate'],
            });
        },
    });

    const handleTextFieldChange = (newText: string, index: number) => {
        setTextFields((state) => {
            const oldState = [...state];
            const field = oldState[index];
            field.text = newText;
            if (field.error) {
                field.error = false;
                field.helperText = undefined;
            }
            //field = newText;

            return oldState;
        });
    };

    const handleTextFieldAdd = () => {
        setTextFields((state) => {
            const newState = [...state];
            const lastIndex = newState.length - 1;
            const lastQuestion = newState[lastIndex];
            if (newState[lastIndex].text.length < 5) {
                lastQuestion.helperText = 'lenght must be grater than 5';
                lastQuestion.error = true;
                return newState;
            }
            lastQuestion.helperText = undefined;
            lastQuestion.error = false;
            //remove previous error message:
            newState.push({ error: false, helperText: undefined, text: '' });
            return newState;
        });
    };

    const handleTextFieldRemove = (index: number) => {
        console.log(textFields.length);
        if (textFields.length == 1) return;
        setTextFields((state) => {
            const newState = [...state]; // Create a copy of the state array
            newState.splice(index, 1); // Remove the element at the specified index
            return newState;
        });
    };

    const handleCreateOrEdit = (createOrEdit: 'create' | 'edit') => {
        let hasSomeError = false;
        setTextFields((f) => {
            const oldTextFields = [...f];
            oldTextFields.forEach((field) => {
                if (field.text.length < 5) {
                    field.error = true;
                    field.helperText = 'lenght must be grater than 5';
                    hasSomeError = true;
                }
            });
            return oldTextFields;
        });
        if (hasSomeError) return;
        const method = createOrEdit == 'create' ? 'POST' : 'PUT';
        questionsMutate({
            itemId: itemId,
            method: method,
            questions: textFields.map((q) => q.text),
        });
    };

    const handleCreate = () => {
        handleCreateOrEdit('create');
    };

    const handleEdit = () => {
        handleCreateOrEdit('edit');
    };

    return (
        <>
            <ItemTopHeader item={dummyItem}></ItemTopHeader>
            <ChecklistTemplateDetailsMain
                createLoading={questionsIsPending}
                dataIsPending={itemDateIsPending}
                createOrEdit={itemData ? 'edit' : 'create'}
                textFields={textFields}
                textFieldRemove={handleTextFieldRemove}
                textFieldAdd={handleTextFieldAdd}
                textFieldChange={handleTextFieldChange}
                onCreate={handleCreate}
                onEdit={handleEdit}
            />
        </>
    );
};

export default ChecklistTemplateDetailsPage;
