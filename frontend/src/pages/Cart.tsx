import React from 'react';

const Cart = () => {
  const carrinho = [
    { id: 1, nome: 'Notebook Gamer', preco: 5999.99, quantidade: 1 },
    { id: 2, nome: 'Mouse Sem Fio', preco: 99.9, quantidade: 2 },
  ];

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <main style={{ padding: '2rem' as const }}>
      <h2>Carrinho de Compras</h2>
      {carrinho.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' as const, marginBottom: '10px' as const }}>
          <span>{item.nome}</span>
          <span>Qtd: {item.quantidade}</span>
          <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
        </div>
      ))}
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button style={{ padding: '10px 15px' as const, background: '#28a745' as const, color: '#fff' as const, border: 'none', borderRadius: '5px' as const, cursor: 'pointer' as const }}>Ir para Checkout</button>
    </main>
  );
};

export default Cart;
