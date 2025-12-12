import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, senha);
      toast.success('Login realizado com sucesso!');
      navigate('/produtos');
    } catch {
      toast.error('Credenciais inválidas');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <Button variant="contained" fullWidth onClick={handleLogin}>
            Entrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
