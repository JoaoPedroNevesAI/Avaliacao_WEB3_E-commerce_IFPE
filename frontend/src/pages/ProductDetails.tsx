import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  imagem?: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get<Produto>(`http://localhost:3000/produtos/${id}`)
        .then((res) => setProduto(res.data))
        .catch((err) => console.error('Erro ao buscar produto:', err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p style={{ padding: '2rem' }}>Carregando...</p>;
  if (!produto) return <p style={{ padding: '2rem' }}>Produto não encontrado.</p>;

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <img 
        src={produto.imagem || '/placeholder.png'} 
        alt={produto.nome} 
        style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '10px' }}
      />
      <h2>{produto.nome}</h2>
      <p>{produto.descricao}</p>
      <h3>R$ {produto.preco.toFixed(2)}</h3>
      <button 
        style={{ background: '#28a745', color: '#fff', padding: '10px 15px', borderRadius: '5px', border: 'none', marginTop: '15px', cursor: 'pointer' }}
        onClick={() => alert('Produto adicionado ao carrinho!')}
      >
        Adicionar ao Carrinho
      </button>
    </main>
  );
};

export default ProductDetails;
