// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { ThemeProvider } from '@mui/material';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import GlobalStyles from './style/GlobalStyles';
import { lightTheme } from './theme';

const router = createBrowserRouter(
  createRoutesFromElements(<Route element={<RootLayout />} path="/" />)
);

function App() {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
