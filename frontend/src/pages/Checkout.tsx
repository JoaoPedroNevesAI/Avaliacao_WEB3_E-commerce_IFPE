import { useState, useEffect } from 'react';
import { Container, Typography, Stack, Button, List, ListItem, ListItemText } from '@mui/material';
import { criarPedido } from '../api/api';
import { useNavigate } from 'react-router-dom';

interface ItemCarrinho {
  produtoId: number;
  nome: string;
  quantidade: number;
  preco: number;
}

interface Carrinho {
  itens: ItemCarrinho[];
}

const Checkout = () => {
  const [carrinho, setCarrinho] = useState<Carrinho>({ itens: [] });
  const navigate = useNavigate();

  const total = carrinho.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const handleCriarPedido = async () => {
    if (carrinho.itens.length === 0) {
      alert('Carrinho vazio');
      return;
    }

    try {
      await criarPedido({
        itens: carrinho.itens.map(item => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
        })),
      });
      alert('Pedido criado com sucesso!');
      setCarrinho({ itens: [] });
      navigate('/pagamento/1'); 
    } catch (error) {
      console.error(error);
      alert('Erro ao criar pedido');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Checkout</Typography>
      <List>
        {carrinho.itens.map(item => (
          <ListItem key={item.produtoId}>
            <ListItemText
              primary={`${item.nome} x ${item.quantidade}`}
              secondary={`R$ ${item.preco * item.quantidade}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 2 }}>Total: R$ {total}</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleCriarPedido}>Finalizar Pedido</Button>
      </Stack>
    </Container>
  );
};

export default Checkout;
