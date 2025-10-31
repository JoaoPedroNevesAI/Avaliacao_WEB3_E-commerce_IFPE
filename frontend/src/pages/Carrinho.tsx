import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Toaster } from 'react-hot-toast';

const Carrinho: React.FC = () => {
  const { carrinho, removerDoCarrinho, aumentarQuantidade, diminuirQuantidade, finalizarCompra } = useAppContext();

  const total = carrinho.reduce((acc, item) => acc + Number(item.preco) * item.quantidade, 0);

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <Toaster position="top-right" />
      <h1>Carrinho</h1>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {carrinho.map(item => (
              <li key={item.id} style={{ border: '1px solid #ccc', padding: 20, marginBottom: 10 }}>
                <h3>{item.nome}</h3>
                <p>Preço unitário: R$ {Number(item.preco).toFixed(2)}</p>
                <p>
                  Quantidade: 
                  <button onClick={() => diminuirQuantidade(item.id)} style={{ margin: '0 5px' }}>-</button>
                  {item.quantidade}
                  <button onClick={() => aumentarQuantidade(item.id)} style={{ margin: '0 5px' }}>+</button>
                </p>
                <p>Subtotal: R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</p>
                <button onClick={() => removerDoCarrinho(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
          <h2>Total: R$ {total.toFixed(2)}</h2>
          <button onClick={finalizarCompra} style={{ marginTop: 20, padding: '10px 20px', fontSize: 16 }}>
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
};

export default Carrinho;
