import * as React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { usePagination } from "../context/PaginationContext";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const { removeSkip } = usePagination();

  const handleLogout = () => {
    logout();
    removeSkip();
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed", zIndex: 2 }}>
      <AppBar
        color="secondary"
        position="static"
        sx={{ width: "100%", boxShadow: "none", zIndex: 2, p: 2 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ShoppingCartIcon color="primary" />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                textAlign: "left",
                fontFamily: "Forte",
                fontSize: "2rem",
              }}
            >
              Store App
            </Typography>
          </Box>

          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
