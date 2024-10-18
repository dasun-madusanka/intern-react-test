// src/components/Layout.tsx
import React from 'react';
import Header from '../src/components/Header';
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
    </>
  );
};

export default Layout;
