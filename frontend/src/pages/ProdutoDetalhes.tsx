import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  categoria?: { id: number; nome: string };
  estoque: number;
};

const ProdutoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { adicionarAoCarrinho } = useAppContext();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const res = await axios.get<Produto>(`http://localhost:3000/produtos/${id}`);
        setProduto(res.data);
      } catch {
        toast.error('Erro ao carregar produto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  if (loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <CircularProgress />
      </div>
    );

  if (!produto) return <p style={{ textAlign: 'center', marginTop: 40 }}>Produto não encontrado.</p>;

  const handleAdicionar = () => {
    adicionarAoCarrinho(produto);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {produto.nome}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {produto.descricao || 'Sem descrição.'}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            R$ {Number(produto.preco).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Categoria: {produto.categoria?.nome || 'Não especificada'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Estoque: <strong>{produto.estoque}</strong> unidades
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdicionar}
          disabled={produto.estoque <= 0}
          sx={{
            borderRadius: 0,
            textTransform: 'none',
            fontWeight: 600,
            py: 1.2,
          }}
        >
          {produto.estoque > 0 ? 'Adicionar ao Carrinho' : 'Esgotado'}
        </Button>
      </Card>
    </div>
  );
};

export default ProdutoDetalhes;
