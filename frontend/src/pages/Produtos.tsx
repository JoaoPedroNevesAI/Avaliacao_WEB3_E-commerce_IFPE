import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  ativo: boolean;
  categoria: {
    id: number;
    nome: string;
  };
}

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get<Produto[]>('http://localhost:3000/produtos');
        setProdutos(response.data.filter(p => p.ativo));
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProdutos();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      {produtos.map(produto => (
        <Grid item key={produto.id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{produto.nome}</Typography>
              <Typography>Categoria: {produto.categoria.nome}</Typography>
              <Typography>R$ {produto.preco.toFixed(2)}</Typography>
              <Button
                disabled={produto.estoque === 0}
                onClick={() => navigate(`/produtos/${produto.id}`)}
                variant="contained"
                sx={{ mt: 1 }}
              >
                {produto.estoque === 0 ? 'Indisponível' : 'Ver Detalhes'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Produtos;
