import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ChecklistTemplateDetailsMain from '../../components/Item/ChecklistTemplateDetailsMain';
import ItemTopHeader from '../../components/Item/ItemTemplateTopHeader';
import { useDeleteQuestion } from '../../hooks/useDeleteQuestion';
import { usePostNewQuestion } from '../../hooks/usePostNewQuestion';
import { usePutUpdateQuestion } from '../../hooks/usePutUpdateQuestion';
import apiService from '../../services/api';
import { ItemTemplate, QuestionTemplate } from '../../services/apiTypes';
import BottomButtons from '../../components/BottomButtons/BottomButtons';
import { Button } from '@mui/material';

//TODO: let user deside what to do with conflicting templates
//(checklists that have started to be filled out based on questions from QuestionTemplates)

const EditChecklistTemplateDetailsPage = () => {
    // const { pathname } = useLocation();
    const navigate = useNavigate();
    const { itemTemplateId } = useParams();

    console.log(itemTemplateId);
    const [textFields, setTextFields] = useState<
        //TODO: add chagnedTextfield
        { question: QuestionTemplate; error: boolean; helperText?: string }[]
    >([]);

    const { data: itemData, isPending: itemDataIsPending } = useQuery({
        queryKey: [itemTemplateId, 'itemTemplate'],
        queryFn: async ({ signal }) =>
            apiService().getItemTemplate({ signal, itemTemplateId: itemTemplateId! }),
        enabled: !!itemTemplateId,
    });

    const { checklistTemplate } = itemData ?? {};
    const { id: checklistTemplateId } = checklistTemplate ?? {};

    // const { id: itemTemplateId } = itemData ?? {};

    const { data: checklistItemQuestionConflictdata } = useQuery({
        queryKey: ['checklistTemplateConflict', itemTemplateId],
        queryFn: async ({ signal }) =>
            apiService().getCheckItemQuestionConflicts({
                signal,
                checklistTemplateId: checklistTemplateId!,
                itemTemplateId: itemTemplateId!,
            }),
        enabled: !!itemTemplateId && !!checklistTemplateId,
    });

    const { mutate: questionsMutate, isPending: questionsIsPending } = usePutUpdateQuestion();

    useEffect(() => {
        if (itemData?.checklistTemplate) {
            const questions = itemData.checklistTemplate.questions.map((q) => ({
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
    }, [itemData, itemDataIsPending, itemTemplateId]);

    const { mutate: addQuestionMutate, isPending: addQuestionIsPending } = usePostNewQuestion();

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
        if (!checklistTemplate) return;
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
        addQuestionMutate({
            itemTemplateId: itemTemplateId!,
            question: '',
            checklistTemplateId: checklistTemplate.id,
        });
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
        if (!checklistTemplate) return;
        deleteQuestionMutate({
            index: index,
            itemTemplateId: itemTemplateId!,
            checklistTemplateId: checklistTemplate.id,
            questionId: questionId,
        });
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

    const handleInputSendRequest = (index: number, questionId: string, text: string) => {
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
        if (!checklistTemplate) return;
        questionsMutate({
            itemTemplateId: itemTemplateId!,
            checklistTemplateId: checklistTemplate.id,
            question: text,
            questionId: questionId,
        });
    };

    //const isloading = deleteQuestionIsPending || questionsIsPending || addQuestionIsPending;
    const isAnyConflictWithItem =
        checklistItemQuestionConflictdata && checklistItemQuestionConflictdata.length > 0;
    return (
        <>
            <ItemTopHeader itemTemplateId={itemTemplateId}></ItemTopHeader>
            <ChecklistTemplateDetailsMain
                loading={itemDataIsPending}
                readonlyMode={isAnyConflictWithItem ?? true}
                onInputBlur={handleInputSendRequest}
                textFields={textFields}
                textFieldRemove={handleDeleteQuestion}
                textFieldAdd={handleTextFieldAdd}
                textFieldChange={handleTextFieldChange}
                title="Edit template"
                // onCreate={handleCreate}
                // onEdit={handleEdit}
            />
            <BottomButtons>
                <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Button variant="contained" size="small" disabled={false}>
                    Save
                </Button>
            </BottomButtons>
        </>
    );
};

export default EditChecklistTemplateDetailsPage;
