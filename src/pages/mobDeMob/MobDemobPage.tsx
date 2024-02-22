import { Box, Button, Grid, IconButton, ListItemButton, Typography } from '@mui/material';
import CardWrapper from '../../components/UI/CardWrapper';
import CardWrapperList, { StyledUl } from '../../components/UI/CardWrapperList';
import NestedList from '../../components/UI/NestedList';
import { Part } from '../../utils/types';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const dummyPart1: Part = {
    type: 'assembly',
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

const dummyPart2: Part = {
    type: 'assembly',
    itemId: 'ølko-as9as-dk',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bolt2.0',
    id: 'asdonal-asdlma-das',
    serialNumber: 'asuiabs-daisd-adas',
    partTemplateId: 'okda-asjda-adh',
    wpId: 'aow-adnas-dasd',
    partOf: {
        partId: 'alsk-as9as-dk',
        type: 'item',
    },
};

const dummyPart3: Part = {
    type: 'item',
    itemId: 'poasd-sadl-as9as-drrr',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bolt2.0',
    id: 'lkdf-asjdb-sdi3',
    serialNumber: 'qwoie-qweiqna-kasnda',
    partTemplateId: 'okda-asjda-adh',
    wpId: 'aow-adnas-dasd',
    partOf: {
        partId: 'alsk-as9as-dk',
        type: 'item',
    },
};

const mockParts: Part[] = [dummyPart2, dummyPart3];

const MobDemobPage = () => {
    const [isMobilization, setIsMobilization] = useState(true);
    const navigate = useNavigate();

    // const handleCardClick = (route: string) => {
    //     navigate(route);
    // };

    const handleChecklistClick = (e: React.MouseEvent<HTMLButtonElement>, callBack: () => void) => {
        e.stopPropagation();
        callBack();
    };

    const TopPartCard = (
        <CardWrapper
            firstChild={
                <StyledUl>
                    <CardWrapperList id={'Item-ID'} text={dummyPart1.itemId} />
                    <CardWrapperList id={'Item name'} text={dummyPart1.name} />
                    <CardWrapperList id={'Item-type'} text={dummyPart1.type} />
                </StyledUl>
            }
            secondChild={
                <StyledUl>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography variant="caption" component="span">
                            Go to checklist
                        </Typography>
                        <IconButton
                            onClick={(e) =>
                                handleChecklistClick(e, () => navigate('/checklist/id'))
                            }
                            sx={{ color: 'primary.main' }}
                        >
                            <AssignmentTurnedInIcon />
                        </IconButton>
                    </Box>
                </StyledUl>
            }
        />
    );

    const SubPartCardList = mockParts.map((part, index) => {
        return (
            <ListItemButton
                onClick={
                    part.type != 'item' ? () => navigate(`/mobdemob/${part.itemId}`) : undefined
                }
                key={index}
            >
                <CardWrapper
                    firstChild={
                        <StyledUl>
                            <CardWrapperList id={'Item-ID'} text={part.itemId} />
                            <CardWrapperList id={'Item name'} text={part.name} />
                            <CardWrapperList id={'Item-type'} text={part.type} />
                        </StyledUl>
                    }
                    secondChild={
                        <StyledUl>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography variant="caption" component="span">
                                    Go to checklist
                                </Typography>
                                <IconButton
                                    onClick={(e) =>
                                        handleChecklistClick(e, () => navigate('/checklist/id'))
                                    }
                                    sx={{ color: 'primary.main' }}
                                >
                                    <AssignmentTurnedInIcon />
                                </IconButton>
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
            <Box marginTop={'2rem'}>
                <Grid container>
                    <Grid item flexGrow={1}>
                        <Typography variant="h4">
                            {isMobilization ? 'Mobilization' : dummyPart1.type.toUpperCase()}
                        </Typography>
                        {/* <Typography variant="body1"> */}
                        {!isMobilization ? (
                            <Box>
                                <Box>
                                    <b>part-Id</b>: {dummyPart1.id}
                                </Box>
                                <Box>
                                    <b>part name</b>: {dummyPart1.name}
                                </Box>
                            </Box>
                        ) : (
                            'asdl-asdkas-dak'
                        )}
                        {/* </Typography> */}
                    </Grid>
                    {!isMobilization && dummyPart1.partOf && (
                        <Grid item display={'flex'} flexDirection={'column'} gap={2}>
                            <Box>
                                <b>Part Of</b>:
                            </Box>
                            <Box>
                                <b>{dummyPart1.partOf?.type.toUpperCase()}</b>
                            </Box>
                            <Box>{dummyPart1.partOf?.partId}</Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <NestedList somethingHere={partCardWithPartCards} />
        </>
    );
};

export default MobDemobPage;
