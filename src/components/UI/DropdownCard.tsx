import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardWrapper from './CardWrapper';
import CardWrapperList from './CardWrapperList';
import { listTextType } from './NestedList';

interface Props {
    item: listTextType;
    index: number;
    openState: boolean;
    handleClick: (index: number) => void;
}

const Card: React.FC<Props> = ({ item, index, openState, handleClick }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ mt: 5 }}>
            <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                <ListItemButton onClick={() => handleClick(index)} sx={{ mt: 5 }}>
                    {openState ? <ExpandLess /> : <ExpandMore />}
                    <CardWrapper
                        firstChild={
                            <CardWrapperList id={item.id} text={item.text}></CardWrapperList>
                        }
                        secondChild={
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography variant="caption" component="span">
                                    Go to checklist
                                </Typography>
                                <AssignmentTurnedInIcon sx={{ flexBasis: '15%' }} />
                            </Box>
                        }
                    />
                </ListItemButton>
                <Collapse in={openState || false} timeout="auto" unmountOnExit>
                    <Divider
                        orientation="vertical"
                        sx={{
                            float: 'left',
                            pl: 18,
                            borderRightWidth: 3,
                            borderColor: ['#7B8287'],
                        }}
                    />
                    <List component="div" disablePadding sx={{ pl: 24 }}>
                        <ListItemButton>
                            <ListItemIcon sx={{ width: '100%' }} onClick={() => navigate('/')}>
                                <CardWrapper
                                    firstChild={
                                        <CardWrapperList
                                            id={item.id}
                                            text={item.text}
                                        ></CardWrapperList>
                                    }
                                    secondChild={
                                        // <CardWrapperList
                                        //     id={item.id}
                                        //     text={item.text}
                                        // ></CardWrapperList>
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Typography variant="caption" component="span">
                                                Go to checklist
                                            </Typography>
                                            <AssignmentTurnedInIcon sx={{ flexBasis: '15%' }} />
                                        </Box>
                                    }
                                />
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </Collapse>
            </Stack>
        </Box>
    );
};

export default Card;
