// src/components/Layout.tsx
import React from 'react';
import Header from '../src/components/Header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{width: "100%", p: 2}}>
        {children}
      </Container>
      <Fab sx={{position: "fixed", bottom: 16, right: 16}} aria-label="add-product" color='secondary'>
            <AddIcon />
          </Fab>
    </>
  );
};

export default Layout;
