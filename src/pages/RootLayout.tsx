import { Container, CssBaseline, styled } from '@mui/material';
import TopBar from '../components/Header/TopBar';
import { Outlet } from 'react-router-dom';

const MainContainer = styled(Container)(({ theme }) => ({
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
