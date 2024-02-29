import { useState } from 'react';
import ChecklistTemplateDetailsMain from '../../components/Item/ChecklistTemplateDetailsMain';
import ItemTopHeader from '../../components/Item/ItemTopHeader';
import { Item } from '../../utils/types';
import { useNavigate } from 'react-router-dom';

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
    //const [createOrEdit, setCreateOrEdit] = useState<CreateOrEdit>('create');
    const [textFields, setTextFields] = useState([
        { text: 'first one here' },
        { text: 'second here' },
    ]);

    const handleTextFieldChange = (newText: string, index: number) => {
        setTextFields((state) => {
            console.log(newText);
            const newState = [...state];
            const field = newState[index];
            field.text = newText;

            return newState;
        });
    };

    const handleTextFieldAdd = () => {
        setTextFields((state) => {
            const newState = [...state];
            newState.push({ text: 'hello there' });
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

    const handleCreate = () => {
        console.log('creating....');
        console.log(textFields);
        navigate(-1);
    };

    const handleEdit = () => {
        console.log('saving changes....');

        console.log(textFields);
    };

    return (
        <>
            <ItemTopHeader item={dummyItem}></ItemTopHeader>
            <ChecklistTemplateDetailsMain
                createOrEdit="create"
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
