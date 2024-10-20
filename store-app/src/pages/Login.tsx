import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  CssBaseline,
  Grid,
  Alert
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors["email"] = "Email is required";
    else if (!validateEmail(email)) newErrors["email"] = "Email is invalid";
    if (!password) newErrors["password"] = "Password is required";
    else if (password.length < 8)
      newErrors["password"] = "Password is too short";
    else if (!/[A-Z]/.test(password))
      newErrors["password"] =
        "Password must contain at least one uppercase letter";
    else if (!/[a-z]/.test(password))
      newErrors["password"] =
        "Password must contain at least one lowercase letter";
    else if (!/[0-9]/.test(password))
      newErrors["password"] = "Password must contain at least one number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateFields()) {
      login(email);
      navigate("/");
      console.log("Login submitted:", { email, password });
    }

    console.log("Error In Login");
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: "flex", alignItems: "center", height: "100vh" }}
    >
      <CssBaseline />
      <Box
        sx={{
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          jc: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <Alert severity="info" sx={{mb: 2}}>Use any email and password</Alert>
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
