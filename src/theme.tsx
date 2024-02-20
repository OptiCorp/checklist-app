import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
    palette: {
        //...defaultTheme.palette,
        primary: {
            main: '#000000',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FF0000',
            contrastText: '#000000',
        },
        mode: 'light',
    },
    //shadows: Array(25).fill('none') as Shadows,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
    },
    // shape: {
    //     borderRadius: 0,
    // },
    spacing: 4,
});
