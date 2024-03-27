import { LoadingButton } from '@mui/lab';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QuestionTemplate } from '../../services/apiTypes';
import BottomButtons from '../BottomButtons/BottomButtons';
import TextInput from '../UI/TextInput';

interface Props {
    textFieldRemove: (index: number, id: string) => void;
    textFieldAdd: () => void;
    textFields: { question: QuestionTemplate; error: boolean; helperText?: string }[];
    textFieldChange: (text: string, index: number) => void;
    // onCreate: () => void;
    // onEdit: () => void;
    loading: boolean;
    onInputBlur?: (index: number, questionId: string, text: string) => void;
    readonlyMode: boolean;
    title: string;
}

const ChecklistTemplateDetailsMain = ({
    textFields,
    textFieldRemove,
    textFieldAdd,
    textFieldChange,
    // onCreate,
    // onEdit,
    loading,
    onInputBlur,
    readonlyMode,
    title,
}: Props) => {
    const navigate = useNavigate();
    return (
        <Box mt={5}>
            <Typography variant="h5">{title}</Typography>
            {loading && (
                <Box my={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
            <Stack spacing={3}>
                {textFields.map((field, index) => (
                    <TextInput
                        disabled={readonlyMode}
                        onBlur={(e) =>
                            onInputBlur
                                ? onInputBlur(index, field.question.id, e.target.value)
                                : null
                        }
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
                {!loading && (
                    <LoadingButton
                        variant="contained"
                        // loading={loading}
                        disabled={readonlyMode}
                        onClick={textFieldAdd}
                    >
                        ADD
                    </LoadingButton>
                )}
            </Stack>
        </Box>
    );
};

export default ChecklistTemplateDetailsMain;
