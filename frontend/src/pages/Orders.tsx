import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface ItemPedido {
  id: number;
  produto: {
    id: number;
    nome: string;
    preco: number;
  };
  quantidade: number;
  subtotal: number;
}

interface Pedido {
  id: number;
  status: string;
  itens: ItemPedido[];
}

const Orders: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await api.get('/pedidos/cliente/1');
        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h2>Meus Pedidos</h2>

      {pedidos.length === 0 ? (
        <p>Você ainda não realizou pedidos.</p>
      ) : (
        pedidos.map((pedido) => (
          <div
            key={pedido.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h3>Pedido #{pedido.id}</h3>
            <p>Status: {pedido.status}</p>
            <ul>
              {pedido.itens.map((item) => (
                <li key={item.id}>
                  {item.produto.nome} - R$ {item.produto.preco.toFixed(2)} x {item.quantidade} = R$ {item.subtotal.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
