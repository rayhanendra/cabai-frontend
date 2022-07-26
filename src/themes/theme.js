import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#2EB086'
    },
    secondary: {
      main: '#313552'
    },
    dark: {
      main: '#313552',
      light: '#F3F5F9'
    },
    black: '#222222',
    red: {
      main: '#B8405E'
    },
    green: {
      main: '#2EB086'
    },
    error: {
      main: red.A400
    },
    optional: {
      main: '#1E1E1E',
      contrastText: '#FFFFFF'
    }
  },

  typography: {
    // 14 by default
    // fontSize: 14,
    fontFamily: ['"Poppins"', 'sans-serif'].join(','),
    h4: { fontSize: '15.63px', fontWeight: 'bold' },
    h5: {
      fontSize: '12.5px',
      fontWeight: 'bold'
    },
    h6: {
      fontSize: '12px',
      fontWeight: 'bold'
    },
    body1: {
      fontSize: '12px'
    },
    body2: {
      fontSize: '12.5px'
    }
  }
});

export default theme;
