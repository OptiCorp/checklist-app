import { useState } from 'react';
import ChecklistTemplateDetailsMain from '../../components/Part/ChecklistTemplateDetailsMain';
import PartTopHeader from '../../components/Part/PartTopHeader';
import { PartType } from '../../utils/types';

export type CreateOrEdit = 'create' | 'edit';

export type Part = {
    partId: string;
    type: PartType;
    wpId: string;
    serialNumber: string;
    name: string;
    partTemplateId: string;
    hasChecklistTemplate: boolean;
};
const dummyPart: Part = {
    partId: '31232',
    hasChecklistTemplate: true,
    name: 'Geir2.0',
    partTemplateId: '9391293',
    serialNumber: '131233',
    type: 'item',
    wpId: '1231232',
};

const ChecklistTemplateDetailsPage = () => {
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
    };

    const handleEdit = () => {
        console.log('saving changes....');

        console.log(textFields);
    };

    return (
        <>
            <PartTopHeader part={dummyPart} showAddChecklistTemplateButton={false}></PartTopHeader>
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
