import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import OverViewTabs from '../../components/landingPage/OverViewTabs';
import { BreadcrumbsContext } from '../../store/breadcrumbsContext';

const LandingPage = () => {
    const { state, dispatch } = useContext(BreadcrumbsContext);

    console.log(state.links);

    return (
        <Box>
            <Typography variant="body1">Welcome Gudrun</Typography>
            <OverViewTabs></OverViewTabs>
        </Box>
    );
};

export default LandingPage;
