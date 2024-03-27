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
import { usePostCreateChecklistTemplate } from '../../hooks/usePostCreateChecklistTemplate';

export type CreateOrEdit = 'create' | 'edit';

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

    useEffect(() => {
        if (checklistTemplate) {
            navigate(`/${itemTemplateId}/checklistTemplate/edit`);
        }
    }, [checklistTemplate]);

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

    const verifyTextInputs = (): boolean => {
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
        return hasError;
    };

    const handleTextFieldAdd = () => {
        if (verifyTextInputs()) return;
        setTextFields((prev) => {
            return [
                ...prev,
                {
                    id: Math.random().toString(20).substring(2, 6),
                    question: { id: Math.random().toString(20).substring(2, 6), question: '' },
                    error: false,
                },
            ];
        });
    };

    const handleDeleteQuestion = (index: number) => {
        // console.log(textFields.length);
        // if (textFields.length == 1) return;
        // setTextFields((state) => {
        //     const newState = [...state]; // Create a copy of the state array
        //     newState.splice(index, 1); // Remove the element at the specified index
        //     return newState;
        // });
        if (index == 0) return;
        setTextFields((prev) => {
            const prevChecklistTemplate = [...prev];
            prevChecklistTemplate.splice(index, 1);
            return prevChecklistTemplate;
        });
    };

    // const handleInputSendRequest = (index: number, questionId: string, text: string) => {
    //     const textStripped = text.trim();
    //     //const field = textFields.find((q) => q.question.id == questionId);
    //     if (textStripped.length <= 5) {
    //         setTextFields((f) => {
    //             const fields = [...f];
    //             const field = fields[index];
    //             field.error = true;
    //             field.helperText = 'lenght must be grater than 5';
    //             return fields;
    //         });
    //         return;
    //     }
    //     if (!checklistTemplate) return;
    //     questionsMutate({
    //         itemTemplateId: itemTemplateId!,
    //         checklistTemplateId: checklistTemplate.id,
    //         question: text,
    //         questionId: questionId,
    //     });
    // };

    const {
        mutate: createChecklistTemplateMutate,
        isPending: createItemTemplateIsPending,
        isSuccess: createChecklistTempalteSuccess,
    } = usePostCreateChecklistTemplate();

    if (createChecklistTempalteSuccess) {
        navigate(`/${itemTemplateId}/checklistTemplate/edit`);
    }

    const handleCreateChecklistTemplate = () => {
        if (!itemTemplateId) return;
        if (verifyTextInputs()) return;
        const questions = textFields.map((t) => t.question.question);
        createChecklistTemplateMutate({ itemTemplateId, questions });
    };
    return (
        <>
            <ItemTopHeader itemTemplateId={itemData?.id}></ItemTopHeader>
            <ChecklistTemplateDetailsMain
                loading={false}
                // readonlyMode={
                //     !checklistItemQuestionConflictdata ||
                //     checklistItemQuestionConflictdata.length > 0
                // }
                readonlyMode={false}
                textFields={textFields}
                textFieldRemove={handleDeleteQuestion}
                textFieldAdd={handleTextFieldAdd}
                textFieldChange={handleTextFieldChange}
                title="Create template"
                // onCreate={handleCreate}
                // onEdit={handleEdit}
            />
            <BottomButtons>
                <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    disabled={false}
                    onClick={handleCreateChecklistTemplate}
                >
                    Create
                </Button>
            </BottomButtons>
        </>
    );
};

export default EditChecklistTemplateDetailsPage;
