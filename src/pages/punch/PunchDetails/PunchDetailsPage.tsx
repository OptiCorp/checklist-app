import React from 'react';
import { PunchDetailsHeader } from '../../../components/Punch/PunchDetails/PunchDetailsHeader';
import PunchDetailsMain from '../../../components/Punch/PunchDetails/PunchDetailsMain';
import { Item, Punch } from '../../../utils/types';
import { PunchDetails } from '../Punches/PunchesPage';

const dummyPunch: Punch = {
    id: 'sakj-sd1',
    checklistItemId: 'asdn-12-3kas',
    created: new Date(),
    lastModified: new Date(),
    description: 'some descrption',
    title: 'some title',
    imagUrls: [
        'https://picsum.photos/150',
        'https://picsum.photos/150',
        'https://picsum.photos/150',
    ],
};

const dummyItem: Item = {
    type: 'item',
    itemId: 'alsk-as9as-dk',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bob2.0',
    id: '42342-42342-12311',
    serialNumber: 'asdlømad',
    itemTemplateId: 'lsk-alsd',
    wpId: 'alk alsd',
    partOf: {
        itemId: '12343-asd-dd-a',
        type: 'assembly',
    },
};

const dummyPunchDetails: PunchDetails = {
    sasToken: '',
    itemTemplate: dummyItem,
    punch: dummyPunch,
};

const PunchDetailsPage = () => {
    const [editMode, setChecked] = React.useState(false);

    const handleEditModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <>
            <PunchDetailsHeader
                editMode={editMode}
                editModeChange={handleEditModeChange}
                punchId={dummyPunchDetails.punch.id}
            ></PunchDetailsHeader>
            <PunchDetailsMain punchDetails={dummyPunchDetails} editMode={editMode} />
        </>
    );
};

export default PunchDetailsPage;
