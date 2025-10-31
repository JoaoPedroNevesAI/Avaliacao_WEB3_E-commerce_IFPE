import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Toaster } from 'react-hot-toast';

const Produtos: React.FC = () => {
  const { produtos, adicionarAoCarrinho } = useAppContext();

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <Toaster position="top-right" />
      <h1>Produtos</h1>
      {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {produtos.map(produto => (
          <li
            key={produto.id}
            style={{ border: '1px solid #ccc', padding: 20, marginBottom: 10 }}
          >
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <p>Preço: R$ {Number(produto.preco).toFixed(2)}</p>
            <button onClick={() => adicionarAoCarrinho(produto)}>
              Adicionar ao carrinho
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produtos;
