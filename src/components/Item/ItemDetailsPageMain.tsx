import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ItemChecklists, Punch } from '../../utils/types';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList, { StyledUl } from '../UI/CardWrapperList';
import SearchInput from '../UI/SearchInput';

//TODO: get input search field and list checklistTemplates to see history for the item.
//TODO: when no checklistTemplate, show missing checklistTemplate
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

const mockChecklistItems: ItemChecklists[] = [
    {
        created: new Date(),
        id: 'asldas-dklskd1-dasd-sald',
        PartOfMobId: 'adka-ldaslkd-asd',
        Punches: dummyPunches,
        lastModified: new Date(),
    },
    {
        created: new Date(),
        id: 'dasdd-qqqq-sss-ddd',
        PartOfMobId: 'adka-ldaslkd-asd',
        Punches: dummyPunches,
        lastModified: new Date(),
    },
];

const ItemDetailsPageMain = () => {
    const navigate = useNavigate();

    const checklistElements = mockChecklistItems.map((pc) => {
        return (
            <CardWrapper
                key={pc.id}
                onClick={() => navigate('/checklist/someId')} //todo:
                firstChild={
                    <StyledUl>
                        <CardWrapperList id={'id'} text={pc.id} />
                        <CardWrapperList id={'Part of Mob'} text={pc.PartOfMobId} />
                        <CardWrapperList id={'Created'} text={`${pc.created.toDateString()}`} />
                    </StyledUl>
                }
                secondChild={
                    <StyledUl>
                        <CardWrapperList id={'Punches'} text={`${pc.Punches.length}`} />
                    </StyledUl>
                }
            ></CardWrapper>
        );
    });
    return (
        <>
            <Typography variant="h4">History</Typography>
            <SearchInput loading={false} onChange={() => {}} placeHolder="search"></SearchInput>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>{checklistElements}</Stack>
            </Box>
        </>
    );
};

export default ItemDetailsPageMain;
