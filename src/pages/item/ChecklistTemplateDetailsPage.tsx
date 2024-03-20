import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ChecklistTemplateDetailsMain from '../../components/Item/ChecklistTemplateDetailsMain';
import ItemTopHeader from '../../components/Item/ItemTopHeader';
import { useDeleteQuestion } from '../../hooks/useDeleteQuestion';
import { usePostNewQuestion } from '../../hooks/usePostNewQuestion';
import { usePutUpdateQuestion } from '../../hooks/usePutUpdateQuestion';
import apiService from '../../services/api';
import { Item, QuestionTemplate } from '../../services/apiTypes';

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
    const { itemId } = useParams();

    console.log(itemId);
    const [textFields, setTextFields] = useState<
        //TODO: add chagnedTextfield
        { question: QuestionTemplate; error: boolean; helperText?: string }[]
    >([]);

    const { data: itemData, isPending: itemDataIsPending } = useQuery({
        queryKey: [itemId, 'itemTemplate'],
        queryFn: async ({ signal }) => apiService().getItemTemplate({ signal, itemId: itemId! }),
        enabled: !!itemId,
    });

    const { id: itemTemplateId } = itemData ?? {};

    const { data: checklistItemQuestionConflictdata } = useQuery({
        queryKey: [itemId, itemTemplateId],
        queryFn: async ({ signal }) =>
            apiService().getCheckItemQuestionConflicts({
                signal,
                itemId: itemId!,
                itemTemplateId: itemTemplateId!,
            }),
        enabled: !!itemTemplateId,
    });

    const { mutate: questionsMutate, isPending: questionsIsPending } = usePutUpdateQuestion();

    useEffect(() => {
        if (itemData) {
            const questions = itemData.questions.map((q) => ({
                question: q,
                error: false,
                helperText: undefined,
            }));
            setTextFields(questions);
        } else if (!itemData && !itemDataIsPending) {
            //console.log(itemId);
            //TODO: create the itemTemplate
            //addQuestionMutate({ itemId: itemId, question: 'sample question' });
        }
    }, [itemData, itemDataIsPending, itemId]);

    const { mutate: addQuestionMutate, isPending: addQuestionIsPending } = usePostNewQuestion(
        itemTemplateId!
    );

    const { mutate: deleteQuestionMutate, isPending: deleteQuestionIsPending } =
        useDeleteQuestion();

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
        addQuestionMutate({ itemId: itemId!, question: '' });
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
        deleteQuestionMutate({ index: index, itemId: itemId!, questionId: questionId });
    };

    // const handleCreateOrEdit = (createOrEdit: 'create' | 'edit') => {
    //     let hasSomeError = false;
    //     setTextFields((f) => {
    //         const oldTextFields = [...f];
    //         oldTextFields.forEach((field) => {
    //             if (field.question.question.length <= 5) {
    //                 field.error = true;
    //                 field.helperText = 'lenght must be grater than 5';
    //                 hasSomeError = true;
    //             }
    //         });
    //         return oldTextFields;
    //     });
    //     if (hasSomeError) return;
    //     questionsMutate({
    //         itemId: itemId,
    //         method: method,
    //         questions: textFields.map((q) => q.text),
    //     });
    // };

    // const handleCreate = () => {
    //     handleCreateOrEdit('create');
    // };

    // const handleEdit = () => {
    //     handleCreateOrEdit('edit');
    // };

    const handleInputPutRequest = (index: number, questionId: string, text: string) => {
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
        questionsMutate({ itemId: itemId!, question: text, questionId: questionId });
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
                onInputPutRequest={handleInputPutRequest}
                createOrEdit={itemData ? 'edit' : 'create'}
                textFields={textFields}
                textFieldRemove={handleDeleteQuestion}
                textFieldAdd={handleTextFieldAdd}
                textFieldChange={handleTextFieldChange}
                // onCreate={handleCreate}
                // onEdit={handleEdit}
            />
        </>
    );
};

export default ChecklistTemplateDetailsPage;
