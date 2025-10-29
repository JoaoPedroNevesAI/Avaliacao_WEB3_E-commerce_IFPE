import { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { loginCliente } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    loginCliente({ email, senha }).then(() => navigate('/produtos'));
  };

  return (
    <Container sx={{ marginTop: 2, maxWidth: 400 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Senha"
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button fullWidth variant="contained" onClick={handleLogin}>
        Entrar
      </Button>
    </Container>
  );
};

export default Login;
