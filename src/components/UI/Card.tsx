import { ExpandMore, ExpandLess } from '@mui/icons-material';
import {
    ListItemButton,
    Collapse,
    List,
    ListItemIcon,
    Box,
    Stack,
    Grid,
    Divider,
} from '@mui/material';
import CardWrapper from './CardWrapper';
import React from 'react';
import { listTextType } from './NestedList';
import { useNavigate } from 'react-router-dom';

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
                            <Grid
                                component={'li'}
                                container
                                wrap="nowrap"
                                justifyContent={'space-between'}
                            >
                                <Grid item sx={{ textWrap: 'nowrap' }}>
                                    <b>{item.id}</b>
                                </Grid>
                                <Grid item>{item.text}</Grid>
                            </Grid>
                        }
                        secondChild={
                            <Grid
                                component={'li'}
                                container
                                wrap="nowrap"
                                justifyContent={'space-between'}
                            >
                                <Grid item sx={{ textWrap: 'nowrap' }}>
                                    <b>{item.id}</b>
                                </Grid>
                                <Grid item>{item.text}</Grid>
                            </Grid>
                        }
                    />
                </ListItemButton>
                <Collapse in={openState || false} timeout="auto" unmountOnExit>
                    <Divider
                        orientation="vertical"
                        sx={{
                            float: 'left',
                            pl: 14,
                            borderRightWidth: 3,
                            borderColor: 'darkslategray',
                        }}
                    />
                    <List component="div" disablePadding sx={{ pl: 16 }}>
                        <ListItemButton>
                            <ListItemIcon sx={{ width: '100%' }} onClick={() => navigate('/')}>
                                <CardWrapper
                                    firstChild={
                                        <Grid
                                            component={'li'}
                                            container
                                            wrap="nowrap"
                                            justifyContent={'space-between'}
                                        >
                                            <Grid item sx={{ textWrap: 'nowrap' }}>
                                                <b>{item.id}</b>
                                            </Grid>
                                            <Grid item>{item.text}</Grid>
                                        </Grid>
                                    }
                                    secondChild={
                                        <Grid
                                            component={'li'}
                                            container
                                            wrap="nowrap"
                                            justifyContent={'space-between'}
                                        >
                                            <Grid item sx={{ textWrap: 'nowrap' }}>
                                                <b>{item.id}</b>
                                            </Grid>
                                            <Grid item>{item.text}</Grid>
                                        </Grid>
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
