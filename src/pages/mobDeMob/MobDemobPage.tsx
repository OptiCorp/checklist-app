import NestedList from '../../components/UI/NestedList';
import { Part } from '../../utils/types';

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

// const mockParts: Part[] = [dummyPart, dummyPart, dummyPart];

const MobDemobPage = () => {
    return (
        <>
            <h1>mobdemob</h1>
            <NestedList />
        </>
    );
};

export default MobDemobPage;
