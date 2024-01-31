import { Box, Typography } from '@mui/material';
import React from 'react';
import OverViewTabs from '../../components/landingPage/OverViewTabs';

const LandingPage = () => {
    return (
        <Box>
            <Typography variant="body1">Welcome Gudrun</Typography>
            <OverViewTabs></OverViewTabs>
        </Box>
    );
};

export default LandingPage;
