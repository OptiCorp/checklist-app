import { Box, Button, Container, CssBaseline, styled } from '@mui/material';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useReducer } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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
    const { reset } = useQueryErrorResetBoundary();

    // const { state, dispatch } = useContext(BreadcrumbsContext);

    // const handleNavigate = (navigateTo: string) => {
    //     navigate(navigateTo);
    //     dispatch({ type: ActionType.GoForward, payload: { link: navigateTo } });
    // };

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
                        <ErrorBoundary
                            // FallbackComponent={ErrorFallback}
                            onReset={reset}
                            fallbackRender={({
                                error,
                                resetErrorBoundary,
                            }: {
                                error: Error;
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                resetErrorBoundary: (...args: any[]) => void;
                            }) => (
                                <Box>
                                    <Box>There was an error: {error.message}</Box>
                                    <Button
                                        variant="contained"
                                        onClick={() => resetErrorBoundary()}
                                    >
                                        Try again
                                    </Button>
                                </Box>
                            )}
                        >
                            <Outlet />
                        </ErrorBoundary>
                        <Box id="bottom-buttons" sx={{ marginTop: 'auto' }}></Box>
                    </MainContainer>
                </BreadcrumbsContext.Provider>
                <Footer></Footer>
            </main>
        </>
    );
};

export default RootLayout;
