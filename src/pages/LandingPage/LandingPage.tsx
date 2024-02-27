import { useContext } from 'react';
import OverViewTabs from '../../components/landingPage/OverViewTabs';
import { BreadcrumbsContext } from '../../store/breadcrumbsContext';

const LandingPage = () => {
    const { state } = useContext(BreadcrumbsContext);

    console.log(state.links);

    return (
        <>
            <OverViewTabs></OverViewTabs>
        </>
    );
};

export default LandingPage;
