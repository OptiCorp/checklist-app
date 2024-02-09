import { Container, CssBaseline, styled } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from '../components/Header/TopBar';
import { BreadcrumbsContext, InitialBreadcrumbState } from '../store/breadcrumbsContext';
import { useState, useReducer } from 'react';
import { breadcrumbsReducer } from '../store/breadcrumbsContext/BreadcrumbsReducer';

const MainContainer = styled(Container)(({ _theme }) => ({
    marginTop: '1rem',
}));

const RootLayout = () => {
    const [state, dispatch] = useReducer(breadcrumbsReducer, InitialBreadcrumbState);
    // const { state, dispatch } = useContext(BreadcrumbsContext);

    // const handleNavigate = (navigateTo: string) => {
    //     navigate(navigateTo);
    //     dispatch({ type: ActionType.GoForward, payload: { link: navigateTo } });
    // };

    console.log(location);
    return (
        <>
            <CssBaseline />
            <TopBar />
            <main>
                <BreadcrumbsContext.Provider value={{ state, dispatch }}>
                    <MainContainer maxWidth={'lg'}>
                        <Outlet />
                    </MainContainer>
                </BreadcrumbsContext.Provider>
            </main>
        </>
    );
};

export default RootLayout;
