import { Container, CssBaseline, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/Header/TopBar';
import { BreadcrumbsContext, InitialBreadcrumbState } from '../store/breadcrumbsContext';
import { useState, useReducer } from 'react';
import { breadcrumbsReducer } from '../store/breadcrumbsContext/BreadcrumbsReducer';

const MainContainer = styled(Container)(({ _theme }) => ({
    marginTop: '1rem',
}));

const RootLayout = () => {
    const [state, dispatch] = useReducer(breadcrumbsReducer, InitialBreadcrumbState);

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
