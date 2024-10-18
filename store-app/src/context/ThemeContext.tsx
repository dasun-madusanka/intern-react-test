import React, { createContext, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';

const fontFamily = "'Roboto', sans-serif";

const muiTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#db2777', 
        },
        secondary: {
          main: '#be123c',
        },
      },
  typography: {
    fontFamily: fontFamily,
  },
});

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
