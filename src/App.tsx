// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { useIsAuthenticated } from '@azure/msal-react';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
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

const router = createBrowserRouter(
    createRoutesFromElements(<Route element={<RootLayout />} path="/" />)
);

const ReactQueryDevtoolsProduction = React.lazy(() =>
    import('@tanstack/react-query-devtools/production').then((d) => ({
        default: d.ReactQueryDevtools,
    }))
);

function App() {
    const isAuthenticated = useIsAuthenticated();
    console.log(isAuthenticated);
    const [showDevtools, setShowDevtools] = React.useState(false);

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
