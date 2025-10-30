import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pedido {
  id: number;
  cliente: string;
  total: number;
}

const Pedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    axios.get<Pedido[]>('http://localhost:3000/pedidos')
      .then(res => setPedidos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Pedidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            {pedido.cliente} - R$ {pedido.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pedidos;
