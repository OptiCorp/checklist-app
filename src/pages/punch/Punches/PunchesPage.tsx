import PunchesMain from '../../../components/Punch/PunchesMain';
import PunchesPageHeader from '../../../components/Punch/PunchesPageHeader';
import { BaseEntities } from '../../../utils/types';
import { Part } from '../../part/ChecklistTemplateDetailsPage';

const dummyPart: Part = {
    type: 'item',
    itemId: 'alsk-as9as-dk',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bob2.0',
    id: '42342-42342-12311',
    serialNumber: 'asdlømad',
    partTemplateId: 'lsk-alsd',
    wpId: 'alk alsd',
    partOf: {
        partId: '12343-asd-dd-a',
        type: 'assembly',
    },
};

export interface Punch extends BaseEntities {
    title: string;
    checklistItemId: string;
    description: string;
    imagUrls: string[];
}

export type Punches = {
    sasToken: string;
    punches: Punch[];
    itemTemplate: Part;
};

const dummyPunches: Punch[] = [
    {
        id: 'sakj-sd1',
        checklistItemId: 'asdn-12-3kas',
        created: new Date(),
        lastModified: new Date(),
        description: 'some descrption',
        title: 'some title',
        imagUrls: [],
    },
    {
        id: 'asd-sd2313',
        checklistItemId: 'asdl-13-3kas',
        created: new Date(),
        lastModified: new Date(),
        description: 'some other descrption',
        title: 'some other title',
        imagUrls: [],
    },
];

const punches: Punches = {
    itemTemplate: dummyPart,
    punches: dummyPunches,
    sasToken: 'sometokej',
};

const PunchesPage = () => {
    return (
        <>
            <PunchesPageHeader
                title="Punches"
                checklistItemId="123-1231-3"
                mobilizationId="12312k-asdlada"
                part={punches.itemTemplate}
            ></PunchesPageHeader>
            <PunchesMain punches={punches.punches} sasToken={punches.sasToken} />
        </>
    );
};

export default PunchesPage;
