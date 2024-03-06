import { Box, Button, Stack, Typography } from '@mui/material';
import TextInput from '../UI/TextInput';
import BottomButtons from '../BottomButtons/BottomButtons';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
    createOrEdit: 'create' | 'edit';
    textFieldRemove: (index: number) => void;
    textFieldAdd: () => void;
    textFields: { text: string; error: boolean; helperText?: string }[];
    textFieldChange: (text: string, index: number) => void;
    onCreate: () => void;
    onEdit: () => void;
    createLoading: boolean;
    dataIsPending: boolean;
}

const ChecklistTemplateDetailsMain = ({
    createOrEdit,
    textFields,
    textFieldRemove,
    textFieldAdd,
    textFieldChange,
    onCreate,
    onEdit,
    createLoading,
    dataIsPending,
}: Props) => {
    const title: string =
        createOrEdit == 'create' ? 'Create checklist template' : 'Edit checklist template';
    return (
        <Box mt={5}>
            <Typography variant="h5">{title}</Typography>
            <Stack spacing={3}>
                {textFields.map((field, index) => (
                    <TextInput
                        key={index}
                        onChange={(e) => textFieldChange(e.target.value, index)}
                        placeHolder="Is the part pretty?"
                        IconClick={() => textFieldRemove(index)}
                        helperText={field.helperText}
                        value={field.text}
                        includeClearIcon={true}
                        error={field.error}
                    ></TextInput>
                ))}
                {!dataIsPending && (
                    <Button variant="contained" onClick={textFieldAdd}>
                        ADD
                    </Button>
                )}
            </Stack>
            {!dataIsPending && (
                <BottomButtons>
                    {createOrEdit == 'create' ? (
                        <LoadingButton
                            onClick={onCreate}
                            loading={createLoading}
                            variant="contained"
                        >
                            Create
                        </LoadingButton>
                    ) : (
                        <LoadingButton onClick={onEdit} loading={createLoading} variant="contained">
                            Save
                        </LoadingButton>
                    )}
                </BottomButtons>
            )}
        </Box>
    );
};

export default ChecklistTemplateDetailsMain;
