import React, { useEffect, useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';


type Categoria = {
  id: number;
  nome: string;
};

type Produto = {
  id: number;
  nome: string;
  preco: number | string;
  descricao?: string;
  categoria?: { id: number; nome: string };
};

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState<string | number>('');
  const [loading, setLoading] = useState(false);
  const { adicionarAoCarrinho } = useAppContext();

  useEffect(() => {
    axios
      .get<Categoria[]>('http://localhost:3000/categorias')
      .then((res) => setCategorias(res.data))
      .catch(() => setCategorias([]));
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Produto[]>('http://localhost:3000/produtos', {
          params: {
            nome: busca || undefined,
            categoriaId: categoria || undefined,
          },
          timeout: 5000,
        });
        setProdutos(res.data);
      } catch {
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProdutos();
  }, [busca, categoria]);

  return (
    <div style={{ maxWidth: 1000, margin: '20px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: 25 }}>
        <TextField
          label="Pesquisar produto..."
          variant="outlined"
          fullWidth
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as string | number)}
            label="Categoria"
          >
            <MenuItem value="">Todas</MenuItem>
            {categorias.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <CircularProgress />
        </div>
      ) : produtos.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 5 }}>
          Nenhum produto encontrado.
        </Typography>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {produtos.map((p) => (
            <Card
              key={p.id}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {p.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {p.descricao || 'Sem descrição.'}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  R$ {Number(p.preco).toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Categoria: {p.categoria?.nome || 'Não especificada'}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  adicionarAoCarrinho({
                    id: p.id,
                    nome: p.nome,
                    preco: typeof p.preco === 'string' ? Number(p.preco) : p.preco,
                    descricao: p.descricao ?? '', 
                    categoria: p.categoria ?? '',
                  })
                }
                sx={{
                  borderRadius: 0,
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.2,
                }}
              >
                Adicionar ao Carrinho
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Produtos;
