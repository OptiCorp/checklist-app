import PunchesMain from '../../../components/Punch/Punches/PunchesMain';
import PunchesPageHeader from '../../../components/Punch/Punches/PunchesPageHeader';
import { Item, Punch } from '../../../services/apiTypes';

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

export type PunchesDetails = {
    sasToken: string;
    punches: Punch[];
    itemTemplate: Item;
};

export type PunchDetails = {
    sasToken: string;
    punch: Punch;
    itemTemplate: Item;
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

const punches: PunchesDetails = {
    itemTemplate: dummyItem,
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
                item={punches.itemTemplate}
            ></PunchesPageHeader>
            <PunchesMain punches={punches.punches} sasToken={punches.sasToken} />
        </>
    );
};

export default PunchesPage;
