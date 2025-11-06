import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext, ProdutoCarrinho } from '../context/AppContext';

const ProdutoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { produtos, adicionarAoCarrinho } = useAppContext();

  const produto = produtos.find(p => p.id === Number(id));
  if (!produto) return <p>Produto não encontrado.</p>;

  const handleAdicionar = () => {
    adicionarAoCarrinho({ ...produto, quantidade: 1 } as ProdutoCarrinho);
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <h1>{produto.nome}</h1>
      <p>{produto.descricao}</p>
      <p>Preço: R$ {Number(produto.preco).toFixed(2)}</p>
      <button onClick={handleAdicionar}>Adicionar ao carrinho</button>
    </div>
  );
};

export default ProdutoDetalhes;
