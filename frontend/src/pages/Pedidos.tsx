import { useEffect, useState } from 'react';
import { getPedidos } from '../api/api';
import { Container, Typography, List, ListItem } from '@mui/material';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);

  useEffect(() => {
    getPedidos().then(res => setPedidos(res.data));
  }, []);

  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Pedidos</Typography>
      <List>
        {pedidos.map(p => (
          <ListItem key={p.id}>
            Pedido {p.id} - Total: R$ {p.total} - Status: {p.status}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Pedidos;
