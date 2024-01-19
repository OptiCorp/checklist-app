import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    //...defaultTheme.palette,
    primary: {
      main: '#000000',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#000000'
    },
    mode: 'light'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0
        }
      }
    }
  }
});
