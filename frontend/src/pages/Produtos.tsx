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
  Dialog,
  CardMedia,
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
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
  estoque: number;
  imagem?: string;
};

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState<string | number>('');
  const [loading, setLoading] = useState(false);
  const { adicionarAoCarrinho, carrinho } = useAppContext();
  const [imagemAberta, setImagemAberta] = useState<string | null>(null);

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

  const handleAdicionarAoCarrinho = (produto: Produto) => {
    const itemCarrinho = carrinho.find((item) => item.id === produto.id);
    const quantidadeAtual = itemCarrinho ? itemCarrinho.quantidade : 0;

    if (produto.estoque <= 0) {
      toast.error(`"${produto.nome}" está indisponível no momento`);
      return;
    }

    if (quantidadeAtual + 1 > produto.estoque) {
      toast.error(`Estoque insuficiente! Restam apenas ${produto.estoque} unidades.`);
      return;
    }

    adicionarAoCarrinho({
      id: produto.id,
      nome: produto.nome,
      preco: typeof produto.preco === 'string' ? Number(produto.preco) : produto.preco,
      descricao: produto.descricao ?? '',
      categoria: produto.categoria ?? '',
      estoque: produto.estoque,
    });
  };

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
              {p.imagem && (
                <CardMedia
                  component="img"
                  image={`http://localhost:3000${p.imagem}`}
                  alt={p.nome}
                  onClick={() => setImagemAberta(`http://localhost:3000${p.imagem}`)}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'contain',
                    backgroundColor: '#fafafa',
                    borderBottom: '1px solid #eee',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    padding: '10px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                    },
                  }}
                />
              )}

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
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Estoque:</strong>{' '}
                  {p.estoque > 0 ? p.estoque : 'Indisponível'}
                </Typography>
              </CardContent>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAdicionarAoCarrinho(p)}
                disabled={p.estoque <= 0}
                sx={{
                  borderRadius: 0,
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.2,
                  backgroundColor: p.estoque <= 0 ? '#ccc' : undefined,
                  '&:hover': { backgroundColor: p.estoque <= 0 ? '#ccc' : undefined },
                }}
              >
                {p.estoque > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Modal da imagem ampliada */}
      <Dialog
        open={!!imagemAberta}
        onClose={() => setImagemAberta(null)}
        maxWidth="md"
      >
        {imagemAberta && (
          <img
            src={imagemAberta}
            alt="Visualização do produto"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Produtos;
