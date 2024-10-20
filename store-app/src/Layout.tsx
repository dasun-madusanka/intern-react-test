// src/components/Layout.tsx
import React from "react";
import Header from "../src/components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Box, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
      }}
    >
      {!isLoginPage && <Header />}
      <Container sx={{ width: "100%", p: 2 }}>{children}</Container>
      {!isLoginPage && (
        <Fab
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          aria-label="add-product"
          color="secondary"
          onClick={() => navigate("/products/add")}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Layout;
