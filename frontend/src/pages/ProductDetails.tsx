import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { useCart, Produto } from '../contexts/CartContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    fetchProduto();
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h2>{produto.nome}</h2>
      <p>R$ {produto.preco.toFixed(2)}</p>
      {produto.descricao && <p>{produto.descricao}</p>}
      <button
        onClick={() => addToCart(produto)}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
};

export default ProductDetails;
