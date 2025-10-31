import React from 'react';
import { useAppContext, Pedido } from '../context/AppContext';

const Pedidos: React.FC = () => {
  const { pedidos } = useAppContext();

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <h1>Meus Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        pedidos.map((pedido: Pedido) => (
          <div key={pedido.id} style={{ border: '1px solid #ccc', padding: 20, marginBottom: 20 }}>
            <h3>Pedido #{pedido.id}</h3>
            <p>Data: {pedido.data}</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pedido.itens.map(item => (
                <li key={item.id}>
                  {item.nome} - {item.quantidade} x R$ {Number(item.preco).toFixed(2)} = R$ {(
                    Number(item.preco) * item.quantidade
                  ).toFixed(2)}
                </li>
              ))}
            </ul>
            <h4>Total: R$ {pedido.total.toFixed(2)}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default Pedidos;
