import React from 'react';
import { useCart } from '../contexts/CartContext';

const Checkout: React.FC = () => {
  const { carrinho, total, updateItem, removeFromCart } = useCart();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h2>Checkout</h2>

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
                  R$ {item.preco.toFixed(2)}
                </div>
                <div>
                  <input
                    type="number"
                    value={item.quantidade}
                    min={1}
                    onChange={(e) => updateItem(item.id, Number(e.target.value))}
                    style={{ width: '60px', marginRight: '1rem' }}
                  />
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
                </div>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Total: R$ {total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
};

export default Checkout;
