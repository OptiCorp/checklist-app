import { Typography } from '@mui/material';
import { useContext } from 'react';
import OverViewTabs from '../../components/landingPage/OverViewTabs';
import { BreadcrumbsContext } from '../../store/breadcrumbsContext';

const LandingPage = () => {
    const { state } = useContext(BreadcrumbsContext);

    console.log(state.links);

    return (
        <>
            <Typography variant="body1">Welcome Gudrun</Typography>
            <OverViewTabs></OverViewTabs>
        </>
    );
};

export default LandingPage;
