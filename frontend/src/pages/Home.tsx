import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
}

const Home = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Produto[]>('http://localhost:3000/produtos') // ajuste a URL se necessário
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error('Erro ao buscar produtos:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Carregando produtos...</p>;
  if (produtos.length === 0) return <p style={{ padding: '2rem' }}>Nenhum produto disponível.</p>;

  return (
    <main style={{ display: 'flex', flexWrap: 'wrap' as const, padding: '1rem' as const }}>
      {produtos.map((produto) => (
        <ProductCard
          key={produto.id}
          id={produto.id}
          nome={produto.nome}
          preco={produto.preco}
          descricao={produto.descricao}
        />
      ))}
    </main>
  );
};

export default Home;
