import { useState } from 'react';
import { Container, Typography, Stack, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { criarPagamento } from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const Pagamento = () => {
  const { pedidoId } = useParams<{ pedidoId: string }>();
  const [metodo, setMetodo] = useState<string>('PIX');
  const navigate = useNavigate();

  const handlePagamento = async () => {
    if (!pedidoId) {
      alert('Pedido inválido');
      return;
    }

    try {
      await criarPagamento({ pedidoId: Number(pedidoId), metodo });
      alert('Pagamento realizado com sucesso!');
      navigate('/pedidos');
    } catch (error) {
      console.error(error);
      alert('Erro ao processar pagamento');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Pagamento</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>Escolha o método de pagamento:</Typography>
      <RadioGroup value={metodo} onChange={e => setMetodo(e.target.value)}>
        <FormControlLabel value="PIX" control={<Radio />} label="PIX" />
        <FormControlLabel value="Cartão" control={<Radio />} label="Cartão" />
        <FormControlLabel value="Boleto" control={<Radio />} label="Boleto" />
      </RadioGroup>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handlePagamento}>Pagar</Button>
      </Stack>
    </Container>
  );
};

export default Pagamento;
