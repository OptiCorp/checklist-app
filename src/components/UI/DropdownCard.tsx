import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, Divider, List, ListItemButton } from '@mui/material';
import React from 'react';

interface Props {
    topCard: JSX.Element;
    subCards: JSX.Element[];
    index: number;
    openState: boolean;
    handleDropClick: (index: number) => void;
}

const Card: React.FC<Props> = ({ topCard, subCards, index, openState, handleDropClick }) => {
    return (
        <Box>
            <ListItemButton onClick={() => handleDropClick(index)}>
                {openState ? <ExpandLess /> : <ExpandMore />}
                {topCard}
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
                    {subCards.map((item) => {
                        return item;
                    })}
                </List>
            </Collapse>
        </Box>
    );
};

export default Card;
