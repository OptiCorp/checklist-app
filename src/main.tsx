import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './msalConfig.ts';
import GlobalStyles from './style/GlobalStyles.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <GlobalStyles />
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    </>
);
