import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QuestionTemplate } from '../../services/apiTypes';
import BottomButtons from '../BottomButtons/BottomButtons';
import TextInput from '../UI/TextInput';

interface Props {
    createOrEdit: 'create' | 'edit';
    textFieldRemove: (index: number, id: string) => void;
    textFieldAdd: () => void;
    textFields: { question: QuestionTemplate; error: boolean; helperText?: string }[];
    textFieldChange: (text: string, index: number) => void;
    onCreate: () => void;
    onEdit: () => void;
    loading: boolean;
    onInputBlur: (index: number, questionId: string, text: string) => void;
    readonlyMode: boolean;
}

const ChecklistTemplateDetailsMain = ({
    createOrEdit,
    textFields,
    textFieldRemove,
    textFieldAdd,
    textFieldChange,
    onCreate,
    onEdit,
    loading,
    onInputBlur,
    readonlyMode,
}: Props) => {
    const title: string =
        createOrEdit == 'create' ? 'Create checklist template' : 'Edit checklist template';
    const navigate = useNavigate();
    return (
        <Box mt={5}>
            <Typography variant="h5">{title}</Typography>
            <Stack spacing={3}>
                {textFields.map((field, index) => (
                    <TextInput
                        disabled={loading || readonlyMode}
                        onBlur={(e) => onInputBlur(index, field.question.id, e.target.value)}
                        key={index}
                        onChange={(e) => textFieldChange(e.target.value, index)}
                        placeHolder="Is the part pretty?"
                        IconClick={() => textFieldRemove(index, field.question.id)}
                        helperText={field.helperText}
                        value={field.question.question}
                        includeClearIcon={true}
                        error={field.error}
                        disabeldPropButton={index == 0 || readonlyMode}
                    ></TextInput>
                ))}
                <Button
                    variant="contained"
                    disabled={readonlyMode || loading}
                    onClick={textFieldAdd}
                >
                    ADD
                </Button>
            </Stack>
            {/* {!dataIsPending && (
                <BottomButtons>
                    {createOrEdit == 'create' ? (
                        <LoadingButton onClick={onCreate} loading={loading} variant="contained">
                            Create
                        </LoadingButton>
                    ) : (
                        <LoadingButton onClick={onEdit} loading={loading} variant="contained">
                            Save
                        </LoadingButton>
                    )}
                </BottomButtons>
            )} */}
            <BottomButtons>
                <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </BottomButtons>
        </Box>
    );
};

export default ChecklistTemplateDetailsMain;
