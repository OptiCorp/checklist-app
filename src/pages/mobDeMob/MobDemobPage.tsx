import { Box, Button, Grid, IconButton, ListItemButton, Typography } from '@mui/material';
import CardWrapper from '../../components/UI/CardWrapper';
import CardWrapperList, { StyledUl } from '../../components/UI/CardWrapperList';
import NestedList from '../../components/UI/NestedList';
import { Part } from '../../utils/types';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    const [isMobilization, setIsMobilization] = useState(false);
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
            <ListItemButton onClick={() => navigate('/mobdemob/alsdkm')} key={index}>
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
                                <IconButton
                                    onClick={() => navigate('checklist/id')}
                                    sx={{ flexBasis: '15%', color: 'primary.main' }}
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
                            {isMobilization ? 'Mobilization' : dummyPart.type.toUpperCase()}
                        </Typography>
                        {/* <Typography variant="body1"> */}
                        {!isMobilization ? (
                            <Box>
                                <Box>
                                    <b>part-Id</b>: {dummyPart.id}
                                </Box>
                                <Box>
                                    <b>part name</b>: {dummyPart.name}
                                </Box>
                            </Box>
                        ) : (
                            'asdl-asdkas-dak'
                        )}
                        {/* </Typography> */}
                    </Grid>
                    {dummyPart.partOf && (
                        <Grid item display={'flex'} flexDirection={'column'} gap={2}>
                            <Box>
                                <b>Part Of</b>:
                            </Box>
                            <Box>
                                <b>{dummyPart.partOf?.type.toUpperCase()}</b>
                            </Box>
                            <Box>{dummyPart.partOf?.partId}</Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <NestedList somethingHere={partCardWithPartCards} />
        </>
    );
};

export default MobDemobPage;
