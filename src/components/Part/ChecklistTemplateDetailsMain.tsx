import { Button, Stack, Typography } from '@mui/material';
import TextInput from '../UI/TextInput';
import BottomButtons from '../BottomButtons/BottomButtons';

interface Props {
    createOrEdit: 'create' | 'edit';
    textFieldRemove: (index: number) => void;
    textFieldAdd: () => void;
    textFields: { text: string }[];
    textFieldChange: (text: string, index: number) => void;
    onCreate: () => void;
    onEdit: () => void;
}

const ChecklistTemplateDetailsMain = ({
    createOrEdit,
    textFields,
    textFieldRemove,
    textFieldAdd,
    textFieldChange,
    onCreate,
    onEdit,
}: Props) => {
    const title: string =
        createOrEdit == 'create' ? 'Create checklist template' : 'Edit checklist template';
    return (
        <>
            <Typography variant="h5">{title}</Typography>
            <Stack spacing={3}>
                {textFields.map((field, index) => (
                    <TextInput
                        key={index}
                        onChange={(e) => textFieldChange(e.target.value, index)}
                        placeHolder="Is the part pretty?"
                        IconClick={() => textFieldRemove(index)}
                        value={field.text}
                    ></TextInput>
                ))}
                <Button variant="contained" onClick={textFieldAdd}>
                    ADD
                </Button>
            </Stack>
            <BottomButtons>
                {createOrEdit == 'create' ? (
                    <Button onClick={onCreate} variant="contained">
                        Create
                    </Button>
                ) : (
                    <Button onClick={onEdit} variant="contained">
                        Save
                    </Button>
                )}
            </BottomButtons>
        </>
    );
};

export default ChecklistTemplateDetailsMain;
