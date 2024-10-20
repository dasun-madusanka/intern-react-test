// src/components/Login.tsx
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  CssBaseline,
  Grid,
  Paper
} from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  

  const validateFields = ()=>{
    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors ['email'] = 'Email is required';
    else if (!validateEmail(email)) newErrors ['email'] = 'Email is invalid';
    if (!password) newErrors ['password'] = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateFields()){
        console.log('Login submitted:', { email, password });
    }

    // Perform login logic here, e.g., send a request to your API

    console.log('Login submitted:', { email, password });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{display: "flex", alignItems: "center", height: "100vh"}}>
      <CssBaseline />
      <Box
        sx={{
        maxHeight: "100%",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          jc: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            error={!!errors.email}
            helperText={errors.email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Typography variant="body2">
                Don't have an account? Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
