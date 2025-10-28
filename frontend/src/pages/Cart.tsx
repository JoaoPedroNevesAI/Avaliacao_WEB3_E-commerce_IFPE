import React from 'react';
import { useCart } from '../contexts/CartContext';
import api from '../api/api';

const Cart: React.FC = () => {
  const { carrinho, removeFromCart, clearCart, finalizarPedido, total } = useCart();

  const handleCheckout = async () => {
    if (carrinho.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }

    try {
      const response = await api.post('/pedidos', {
        clienteId: 1,
        itens: carrinho.map((item) => ({
          produtoId: item.id,
          quantidade: item.quantidade,
        })),
      });

      alert(`Pedido criado com sucesso! ID: ${response.data.id}`);
      finalizarPedido();
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao criar pedido.');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h2>Carrinho de Compras</h2>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {carrinho.map((item) => (
              <li
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #ccc',
                  padding: '1rem 0',
                }}
              >
                <div>
                  <strong>{item.nome}</strong> <br />
                  R$ {item.preco.toFixed(2)} x {item.quantidade}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={clearCart}
              style={{
                background: '#666',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              Limpar Carrinho
            </button>

            <button
              onClick={handleCheckout}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              Finalizar Pedido
            </button>
          </div>

          <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Total: R$ {total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
