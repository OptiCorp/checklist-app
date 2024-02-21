import { Box, Button, ListItemButton, Typography } from '@mui/material';
import CardWrapper from '../../components/UI/CardWrapper';
import CardWrapperList, { StyledUl } from '../../components/UI/CardWrapperList';
import NestedList from '../../components/UI/NestedList';
import { Part } from '../../utils/types';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from 'react-router-dom';

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

const mockParts: Part[] = [dummyPart, dummyPart, dummyPart];

const MobDemobPage = () => {
    const navigate = useNavigate();

    const TopPartCard = (
        <CardWrapper
            firstChild={
                <StyledUl>
                    <CardWrapperList id={'Item-ID'} text={dummyPart.itemId} />
                    <CardWrapperList id={'Item name'} text={dummyPart.name} />
                </StyledUl>
            }
            secondChild={
                <StyledUl>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography variant="caption" component="span">
                            Go to checklist
                        </Typography>
                        <AssignmentTurnedInIcon sx={{ flexBasis: '15%' }} />
                    </Box>
                </StyledUl>
            }
        />
    );

    const SubPartCardList = mockParts.map((part, index) => {
        return (
            <ListItemButton onClick={() => navigate('/')} key={index}>
                <CardWrapper
                    firstChild={
                        <StyledUl>
                            <CardWrapperList id={'Item-ID'} text={part.itemId} />
                            <CardWrapperList id={'Item name'} text={part.name} />
                        </StyledUl>
                    }
                    secondChild={
                        <StyledUl>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography variant="caption" component="span">
                                    Go to checklist
                                </Typography>
                                <AssignmentTurnedInIcon sx={{ flexBasis: '15%' }} />
                            </Box>
                        </StyledUl>
                    }
                ></CardWrapper>
            </ListItemButton>
        );
    });

    const partCardWithPartCards: { topCard: JSX.Element; subCards: JSX.Element[] }[] = [
        {
            topCard: TopPartCard,
            subCards: SubPartCardList,
        },
        {
            topCard: TopPartCard,
            subCards: SubPartCardList,
        },
        {
            topCard: TopPartCard,
            subCards: SubPartCardList,
        },
    ];

    return (
        <>
            <h1>mobdemob</h1>
            <NestedList somethingHere={partCardWithPartCards} />
        </>
    );
};

export default MobDemobPage;
