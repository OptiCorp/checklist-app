// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { useIsAuthenticated } from '@azure/msal-react';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import { Login } from './pages/login/Login';
import GlobalStyles from './style/GlobalStyles';
import { queryClient } from './tanstackQuery';
import { lightTheme } from './theme';
import { msalInstance } from './msalConfig';
import LandingPage from './pages/LandingPage/LandingPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<RootLayout />}>
            <Route element={<LandingPage />} path="/"></Route>
        </Route>
    )
);

const ReactQueryDevtoolsProduction = React.lazy(() =>
    import('@tanstack/react-query-devtools/production').then((d) => ({
        default: d.ReactQueryDevtools,
    }))
);

function App() {
    //const isAuthenticated = useIsAuthenticated();
    const [isAuthenticated, setIsAutheticated] = useState(true);
    const [showDevtools, setShowDevtools] = React.useState(false);

    const initiateMsal = useCallback(async () => {
        await msalInstance.initialize(); //old browser does not support having this in the msalConfig file because it is asynchrounous
    }, [msalInstance]); //can maybe remove msalInstace

    useEffect(() => {
        void initiateMsal();
    }, [initiateMsal]);

    React.useEffect(() => {
        //@ts-expect-error toggleDevtools dont support ts
        window.toggleDevtools = () => setShowDevtools((old) => !old);
    }, []);

    return (
        <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={showDevtools} />
                {showDevtools && (
                    <React.Suspense fallback={null}>
                        <ReactQueryDevtoolsProduction />
                    </React.Suspense>
                )}
                {isAuthenticated ? <RouterProvider router={router}></RouterProvider> : <Login />}
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
