// src/components/Layout.tsx
import React from "react";
import Header from "../src/components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%"}}>
      <Header />
      <Container sx={{ width: "100%", p: 2 }}>{children}</Container>
      <Fab
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        aria-label="add-product"
        color="secondary"
        onClick={() => navigate("/products/add")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Layout;
