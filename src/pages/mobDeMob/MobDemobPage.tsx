import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {
    Box,
    FormControlLabel,
    Grid,
    IconButton,
    ListItemButton,
    Switch,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardWrapper from '../../components/UI/CardWrapper';
import CardWrapperList from '../../components/UI/CardWrapperList';
import NestedList from '../../components/UI/NestedList';
import { Item } from '../../services/apiTypes';
import { StyledUl } from '../../style/GlobalStyles';

const dummyItem1: Item = {
    type: 'assembly',
    itemId: 'alsk-as9as-dk',
    created: new Date(),
    lastModified: new Date(),
    name: 'Bob2.0',
    id: '42342-42342-12311',
    serialNumber: 'asdlømad',
    itemTemplateId: 'lsk-alsd',
    checklistId: '4a86b51e-05aa-42c4-d930-08dc39ed4402',
    wpId: 'alk alsd',
};

const dummyItem2: Item = {
    type: 'assembly',
    itemId: 'ølko-as9as-dk',
    created: new Date(),
    lastModified: new Date(),
    checklistId: 'fd1abfc8-e49e-4799-d931-08dc39ed4402',
    name: 'Bolt2.0',
    id: 'asdonal-asdlma-das',
    serialNumber: 'asuiabs-daisd-adas',
    itemTemplateId: 'okda-asjda-adh',
    wpId: 'aow-adnas-dasd',
};

const dummyItem3: Item = {
    type: 'item',
    itemId: 'poasd-sadl-as9as-drrr',
    created: new Date(),
    lastModified: new Date(),
    name: 'Bolt2.0',
    id: 'lkdf-asjdb-sdi3',
    serialNumber: 'qwoie-qweiqna-kasnda',
    checklistId: 'aa5fb6ec-9156-4c99-d932-08dc39ed4402',
    itemTemplateId: 'okda-asjda-adh',
    wpId: 'aow-adnas-dasd',
};

const mockItems: Item[] = [dummyItem2, dummyItem3];

const MobDemobPage = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleEditModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsExpanded(event.target.checked);
    };
    const [isMobilization, setIsMobilization] = useState(false);
    const navigate = useNavigate();

    // const handleCardClick = (route: string) => {
    //     navigate(route);
    // };

    const handleChecklistClick = (e: React.MouseEvent<HTMLButtonElement>, callBack: () => void) => {
        e.stopPropagation();
        callBack();
    };

    const handleExpandChange = (val: boolean) => {
        setIsExpanded(val);
    };

    const TopItemCard = (
        <CardWrapper
            firstChild={
                <StyledUl>
                    <CardWrapperList id={'Item-ID'} text={dummyItem1.itemId} />
                    <CardWrapperList id={'Item name'} text={dummyItem1.name} />
                    <CardWrapperList id={'Item-type'} text={dummyItem1.type} />
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
                                handleChecklistClick(e, () =>
                                    navigate(`/mobId/checklist/${dummyItem1.checklistId}`)
                                )
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

    const SubItemCardList = mockItems.map((item, index) => {
        return (
            <ListItemButton
                onClick={
                    item.type != 'item' ? () => navigate(`/mobdemob/${item.itemId}`) : undefined
                }
                key={index}
            >
                <CardWrapper
                    firstChild={
                        <StyledUl>
                            <CardWrapperList id={'Item-ID'} text={item.itemId} />
                            <CardWrapperList id={'Item name'} text={item.name} />
                            <CardWrapperList id={'Item-type'} text={item.type} />
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
                                        handleChecklistClick(e, () =>
                                            navigate(`/mobId/checklist/${dummyItem1.checklistId}`)
                                        )
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

    const itemCardWithItemCards: { topCard: JSX.Element; subCards: JSX.Element[] }[] = [
        {
            topCard: TopItemCard,
            subCards: SubItemCardList,
        },
        {
            topCard: TopItemCard,
            subCards: SubItemCardList,
        },
        {
            topCard: TopItemCard,
            subCards: SubItemCardList,
        },
    ];

    return (
        <>
            <Box>
                <Grid container>
                    <Grid item flexGrow={1}>
                        <Typography variant="h4">
                            {isMobilization ? 'Mobilization' : dummyItem1.type.toUpperCase()}
                        </Typography>
                        {/* <Typography variant="body1"> */}
                        {!isMobilization ? (
                            <Box>
                                <Box>
                                    <b>part-Id</b>: {dummyItem1.id}
                                </Box>
                                <Box>
                                    <b>part name</b>: {dummyItem1.name}
                                </Box>
                            </Box>
                        ) : (
                            'asdl-asdkas-dak'
                        )}
                        {/* </Typography> */}
                    </Grid>
                    {!isMobilization && dummyItem1.parentId && (
                        <Grid item display={'flex'} flexDirection={'column'} gap={1}>
                            <FormControlLabel
                                value="end"
                                control={
                                    <Switch
                                        color="primary"
                                        checked={isExpanded}
                                        onChange={handleEditModeChange}
                                    />
                                }
                                label={isExpanded ? 'Unexpand all' : 'Expand all'}
                                labelPlacement="start"
                            />
                            <Box>
                                <b>Part Of</b>:
                            </Box>
                            {/* <Box>
                                <b>{dummyItem1.parentId?.type.toUpperCase()}</b>
                            </Box> */}
                            <Box>{dummyItem1.parentId}</Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <NestedList
                somethingHere={itemCardWithItemCards}
                allExpanded={isExpanded}
                changeExpand={handleExpandChange}
            />
        </>
    );
};

export default MobDemobPage;
