import { Box, Container, CssBaseline, styled } from '@mui/material';
import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import TopBar from '../components/Header/TopBar';
import { BreadcrumbsContext, InitialBreadcrumbState } from '../store/breadcrumbsContext';
import { breadcrumbsReducer } from '../store/breadcrumbsContext/BreadcrumbsReducer';

const MainContainer = styled(Container)(({ _theme }) => ({
    paddingTop: '1rem',
    flex: 1,
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
                    <MainContainer
                        maxWidth={'lg'}
                        sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <Outlet />
                        <Box id="bottom-buttons" sx={{ marginTop: 'auto' }}></Box>
                    </MainContainer>
                </BreadcrumbsContext.Provider>
                <Footer></Footer>
            </main>
        </>
    );
};

export default RootLayout;
