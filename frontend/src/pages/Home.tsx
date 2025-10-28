import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useCart } from '../contexts/CartContext';
import { Produto } from '../contexts/CartContext';

const Home: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Carregando produtos...</p>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Lista de Produtos</h2>

      {produtos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nenhum produto disponível.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {produtos.map((produto) => (
            <div
              key={produto.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 10,
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: '#fafafa',
              }}
            >
              <h3>{produto.nome}</h3>
              <p>R$ {produto.preco.toFixed(2)}</p>
              <button
                onClick={() => addToCart(produto)}
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
