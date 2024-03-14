import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChecklistTemplateDetailsMain from '../../components/Item/ChecklistTemplateDetailsMain';
import ItemTopHeader from '../../components/Item/ItemTopHeader';
import apiService, { axiosClient } from '../../services/api';
import { Item, ItemTemplate, QuestionTemplate } from '../../services/apiTypes';
import { queryClient } from '../../tanstackQuery';

export type CreateOrEdit = 'create' | 'edit';

const dummyItem: Item = {
    itemId: '31232',
    id: 'aslkd-12-lsad-a',
    created: new Date(),
    lastModified: new Date(),
    name: 'Hydraulic Arm',
    itemTemplateId: '9391293',
    serialNumber: '131233',
    type: 'item',
    wpId: '1231232',
};

//TODO: let user deside what to do with conflicting templates
//(checklists that have started to be filled out based on questions from QuestionTemplates)

const ChecklistTemplateDetailsPage = () => {
    const { pathname } = useLocation();
    const paths = pathname.split('/');
    const itemId = paths[1] || undefined;
    //const [createOrEdit, setCreateOrEdit] = useState<CreateOrEdit>('create');
    const [textFields, setTextFields] = useState<
        { question: QuestionTemplate; error: boolean; helperText?: string }[]
    >([]);

    const { data: itemData, isPending: itemDateIsPending } = useQuery({
        queryKey: [itemId, 'itemTemplate'],
        queryFn: async ({ signal }) => apiService().getItemTemplate({ signal, itemId }),
        enabled: !!itemId,
    });

    const { id: itemTemplateId } = itemData ?? {};

    const { data: checklistItemQuestionConflictdata } = useQuery({
        queryKey: [itemId, itemTemplateId],
        queryFn: async ({ signal }) =>
            apiService().getCheckItemQuestionConflicts({ signal, itemId, itemTemplateId }),
        enabled: !!itemTemplateId,
    });

    const { mutate: questionsMutate, isPending: questionsIsPending } = useMutation({
        mutationFn: ({
            itemId,
            question,
            questionId,
        }: {
            itemId: string;
            question: string;
            questionId: string;
        }) => {
            return axiosClient(`Templates/${itemId}/${questionId}`, {
                method: 'PUT',
                data: question,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        onMutate: async ({
            itemId,
            question,
            questionId,
        }: {
            itemId: string;
            question: string;
            questionId: string;
        }) => {
            await queryClient.cancelQueries({
                queryKey: [itemId, 'itemTemplate'],
            });

            const previousItemTemplate = queryClient.getQueryData<ItemTemplate>([
                itemId,
                'itemTemplate',
            ]);

            //optimistically update to new value
            //const { questions } = { ...previousChecklist };

            queryClient.setQueryData<ItemTemplate>([itemId, 'itemTemplate'], (old) => {
                if (old) {
                    const questions = [...old.questions];
                    const updatedQuestion = questions.find((q) => q.id == questionId);
                    if (updatedQuestion) {
                        updatedQuestion.question = question;
                    }
                    return { ...old, questions: questions };
                }
                return undefined;
            });

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

    useEffect(() => {
        if (itemData) {
            const questions = itemData.questions.map((q) => ({
                question: q,
                error: false,
                helperText: undefined,
            }));
            setTextFields(questions);
        } else if (!itemData && !itemDateIsPending) {
            //console.log(itemId);
            //TODO: create the itemTemplate
            //addQuestionMutate({ itemId: itemId, question: 'sample question' });
        }
    }, [itemData, itemDateIsPending, itemId]);

    const { mutate: addQuestionMutate, isPending: addQuestionIsPending } = useMutation({
        mutationFn: ({ itemId, question }: { itemId: string; question: string }) => {
            return axiosClient(`Templates/AddQuestionForTemplate/${itemTemplateId}`, {
                method: 'POST',
                data: question,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        onMutate: async ({ itemId, question }: { itemId: string; question: string }) => {
            await queryClient.cancelQueries({
                queryKey: [itemId, 'itemTemplate'],
            });

            const previousItemTemplate = queryClient.getQueryData<ItemTemplate>([
                itemId,
                'itemTemplate',
            ]);

            //optimistically update to new value
            //const { questions } = { ...previousChecklist };

            queryClient.setQueryData<ItemTemplate>([itemId, 'itemTemplate'], (old) => {
                if (old) {
                    const questions = [...old.questions, { id: 'temp', question: question }];
                    return { ...old, questions: questions };
                }
                return undefined;
            });

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

    const { mutate: deleteQuestionMutate, isPending: deleteQuestionIsPending } = useMutation({
        mutationFn: ({
            itemId,
            questionId,
            index,
        }: {
            itemId: string;
            questionId: string;
            index: number;
        }) => {
            return axiosClient(`Templates/${itemId}/DeleteQuestionTemplate/${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        onMutate: async ({
            itemId,
            questionId,
            index,
        }: {
            itemId: string;
            questionId: string;
            index: number;
        }) => {
            await queryClient.cancelQueries({
                queryKey: [itemId, 'itemTemplate'],
            });

            const previousItemTemplate = queryClient.getQueryData<ItemTemplate>([
                itemId,
                'itemTemplate',
            ]);

            //optimistically update to new value
            //const { questions } = { ...previousChecklist };

            queryClient.setQueryData<ItemTemplate>([itemId, 'itemTemplate'], (old) => {
                if (old) {
                    const questions = [...old.questions];
                    questions.splice(index, 1);
                    return { ...old, questions: questions };
                }
                return undefined;
            });

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
            field.question.question = newText;
            if (field.error) {
                field.error = false;
                field.helperText = undefined;
            }
            //field = newText;

            return oldState;
        });
    };

    const handleTextFieldAdd = () => {
        let hasError = false;
        setTextFields((state) => {
            const newState = [...state];
            newState.forEach((f) => {
                if (f.question.question.length < 5) {
                    hasError = true;
                    f.error = true;
                    f.helperText = 'lenght must be grater than 5';
                }
            });
            return newState;
        });
        if (hasError) return;
        addQuestionMutate({ itemId: itemId, question: '' });
    };

    const handleDeleteQuestion = (index: number, questionId: string) => {
        // console.log(textFields.length);
        // if (textFields.length == 1) return;
        // setTextFields((state) => {
        //     const newState = [...state]; // Create a copy of the state array
        //     newState.splice(index, 1); // Remove the element at the specified index
        //     return newState;
        // });
        if (index == 0) return;
        deleteQuestionMutate({ index: index, itemId: itemId, questionId: questionId });
    };

    const handleCreateOrEdit = (createOrEdit: 'create' | 'edit') => {
        let hasSomeError = false;
        setTextFields((f) => {
            const oldTextFields = [...f];
            oldTextFields.forEach((field) => {
                if (field.question.question.length <= 5) {
                    field.error = true;
                    field.helperText = 'lenght must be grater than 5';
                    hasSomeError = true;
                }
            });
            return oldTextFields;
        });
        if (hasSomeError) return;
        // questionsMutate({
        //     itemId: itemId,
        //     method: method,
        //     questions: textFields.map((q) => q.text),
        // });
    };

    const handleCreate = () => {
        handleCreateOrEdit('create');
    };

    const handleEdit = () => {
        handleCreateOrEdit('edit');
    };

    const handleInputUpdate = (index: number, questionId: string, text: string) => {
        const textStripped = text.trim();
        //const field = textFields.find((q) => q.question.id == questionId);
        if (textStripped.length <= 5) {
            setTextFields((f) => {
                const fields = [...f];
                const field = fields[index];
                field.error = true;
                field.helperText = 'lenght must be grater than 5';
                return fields;
            });
            return;
        }
        questionsMutate({ itemId: itemId, question: text, questionId: questionId });
    };

    const isloading = deleteQuestionIsPending || questionsIsPending || addQuestionIsPending;

    return (
        <>
            <ItemTopHeader item={dummyItem}></ItemTopHeader>
            <ChecklistTemplateDetailsMain
                loading={isloading}
                readonlyMode={
                    !checklistItemQuestionConflictdata ||
                    checklistItemQuestionConflictdata.length > 0
                }
                onInputBlur={handleInputUpdate}
                createOrEdit={itemData ? 'edit' : 'create'}
                textFields={textFields}
                textFieldRemove={handleDeleteQuestion}
                textFieldAdd={handleTextFieldAdd}
                textFieldChange={handleTextFieldChange}
                onCreate={handleCreate}
                onEdit={handleEdit}
            />
        </>
    );
};

export default ChecklistTemplateDetailsPage;
