// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
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
import { msalInstance } from './msalConfig';
import ChecklistPage from './pages/ChecklistPage/ChecklistPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import LandingPage from './pages/LandingPage/LandingPage';
import { Login } from './pages/Login/Login';
import RootLayout from './pages/RootLayout';
import MobDemobPage from './pages/mobDeMob/MobDemobPage';
import NewMobilization from './pages/mobDeMob/NewMobilization/NewMobilization';
import ChecklistTemplateDetailsPage from './pages/part/ChecklistTemplateDetailsPage';
import PartDetailsPage from './pages/part/PartDetailsPage';
import PunchDetailsPage from './pages/punch/PunchDetailsPage';
import PunchesPage from './pages/punch/PunchesPage';
import { queryClient } from './tanstackQuery';
import { lightTheme } from './theme';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<RootLayout />}>
            <Route element={<LandingPage />} path="/"></Route>
            <Route element={<NewMobilization />} path="newMob"></Route>
            <Route element={<MobDemobPage />} path="mobdemob" errorElement={<ErrorPage />}></Route>
            <Route element={<ChecklistPage />} path="checklist/:id">
                <Route element={<PunchesPage />} path="punches">
                    <Route element={<PunchDetailsPage />} path="punchDetails/:id"></Route>
                </Route>
            </Route>
            <Route element={<PartDetailsPage />} path="part/:id"></Route>
            <Route element={<ChecklistTemplateDetailsPage />} path="checklistTemplate"></Route>
        </Route>
    )
);

const ReactQueryDevtoolsProduction = React.lazy(() =>
    import('@tanstack/react-query-devtools/production').then((d) => ({
        default: d.ReactQueryDevtools,
    }))
);

function App() {
    //const isAuthenticated = useIsAuthenticated(); //to use Auth from msal
    const [isAuthenticated, setIsAutheticated] = useState(true); //to skip auth
    const [showDevtools, setShowDevtools] = useState(false);

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
