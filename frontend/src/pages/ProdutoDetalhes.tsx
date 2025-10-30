import { useContext } from 'react';
import { AppContext, Produto } from '../context/AppContext';
import { Container, Typography, Button, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ProdutoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) return null;

  const produto: Produto | undefined = context.produtos.find(p => p.id === Number(id));
  if (!produto) return <Typography>Produto não encontrado</Typography>;

  const adicionarCarrinho = () => {
    context.adicionarAoCarrinho(produto);
    navigate('/carrinho');
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{produto.nome}</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>R$ {produto.preco}</Typography>
      <Typography sx={{ mb: 2 }}>{produto.descricao}</Typography>
      <Box>
        <Button variant="contained" onClick={adicionarCarrinho}>
          Adicionar ao Carrinho
        </Button>
      </Box>
    </Container>
  );
};

export default ProdutoDetalhes;
