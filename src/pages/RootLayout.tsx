import { Container, CssBaseline, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/Header/TopBar';

const MainContainer = styled(Container)(({ _theme }) => ({
    marginTop: '1rem',
}));

const RootLayout = () => {
    return (
        <>
            <CssBaseline />
            <TopBar />
            <main>
                <MainContainer maxWidth={'lg'}>
                    <Outlet />
                </MainContainer>
            </main>
        </>
    );
};

export default RootLayout;
