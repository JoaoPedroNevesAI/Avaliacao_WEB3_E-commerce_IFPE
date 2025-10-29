import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Meu E-commerce
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/produtos">Produtos</Button>
          <Button color="inherit" component={Link} to="/carrinho">Carrinho</Button>
          <Button color="inherit" component={Link} to="/pedidos">Pedidos</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
