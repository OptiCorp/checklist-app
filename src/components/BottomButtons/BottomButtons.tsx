import { Box, useMediaQuery } from '@mui/material';
import React, { FC } from 'react';

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const BottomButtons: FC<Props> = ({ children }) => {
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Box
            sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                px: matches ? '12px' : '8px',
                py: '1rem',
            }}
        >
            {children}
        </Box>
    ); //TODO:
};

export default BottomButtons;
