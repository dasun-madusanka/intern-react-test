import React, { createContext, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';

// Define the fixed colors and font family
const primaryColor = '#881337'; // Replace with your primary color
const secondaryColor = '#500724'; // Replace with your secondary color
const fontFamily = "'Roboto', sans-serif"; // Replace with your font family

// Create the theme with a fixed dark mode, primary, and secondary colors
const muiTheme: Theme = createTheme({
    palette: {
        mode: 'dark', // Dark mode enabled
        primary: {
          main: '#db2777', // Set your primary color here
        },
        secondary: {
          main: '#be123c', // Set your secondary color here
        },
      },
  typography: {
    fontFamily: fontFamily,
  },
});

// Create a provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      {children}
    </MuiThemeProvider>
  );
};



// primaryColor: '#881337',
//   secondaryColor: '#500724',