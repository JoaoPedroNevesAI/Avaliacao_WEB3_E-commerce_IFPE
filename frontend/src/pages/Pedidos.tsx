import React from 'react';
import { useAppContext, Pedido } from '../context/AppContext';

const Pedidos: React.FC = () => {
  const { pedidos, cancelarPedido } = useAppContext();

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <h1>Meus Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        pedidos.map((pedido: Pedido) => (
          <div
            key={pedido.id}
            style={{
              border: '1px solid #ccc',
              padding: 20,
              marginBottom: 20,
              borderRadius: 8,
              backgroundColor: '#fafafa',
            }}
          >
            <h3>Pedido #{pedido.id}</h3>
            <p><strong>Data:</strong> {pedido.data}</p>
            <p><strong>Forma de pagamento:</strong> {pedido.formaPagamento}</p>
            <p><strong>Status:</strong> {pedido.status}</p>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pedido.itens.map(item => (
                <li key={item.id}>
                  {item.nome} — {item.quantidade} x R$ {item.preco.toFixed(2)} = R${' '}
                  {(item.preco * item.quantidade).toFixed(2)}
                </li>
              ))}
            </ul>

            <h4>Total: R$ {pedido.total.toFixed(2)}</h4>

            {pedido.status === 'Aguardando Pagamento' && (
              <button
                onClick={() => cancelarPedido(pedido.id)}
                style={{
                  marginTop: 10,
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: 5,
                  backgroundColor: '#d9534f',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Cancelar Pedido
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Pedidos;
