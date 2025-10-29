import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Container, Typography, Button, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

const Carrinho = () => {
  const context = useContext(AppContext);
  const total = context?.carrinho.reduce((acc, item) => acc + item.preco, 0) || 0;

  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Carrinho</Typography>
      <List>
        {context?.carrinho.map((item, idx) => (
          <ListItem key={idx}>{item.nome} - R$ {item.preco}</ListItem>
        ))}
      </List>
      <Typography sx={{ mt: 2 }}>Total: R$ {total}</Typography>
      <Button component={Link} to="/checkout" sx={{ mt: 2 }} variant="contained">
        Finalizar Compra
      </Button>
    </Container>
  );
};

export default Carrinho;
