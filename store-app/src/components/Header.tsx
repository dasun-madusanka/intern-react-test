import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed", zIndex:2 }}>
      <AppBar color='secondary' position="static" sx={{width: "100%", boxShadow: 'none', zIndex:2}}>
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: "left" }}
          >
            Store App
          </Typography>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}