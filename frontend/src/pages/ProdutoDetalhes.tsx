import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProdutoById } from '../api/api';
import { Typography, Button, Container } from '@mui/material';
import { AppContext } from '../context/AppContext';

const ProdutoDetalhes = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<any>(null);
  const context = useContext(AppContext);

  useEffect(() => {
    if (id) getProdutoById(Number(id)).then(res => setProduto(res.data));
  }, [id]);

  if (!produto) return <Typography>Carregando...</Typography>;

  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography variant="h4">{produto.nome}</Typography>
      <Typography variant="h6">R$ {produto.preco}</Typography>
      <Typography sx={{ mb: 2 }}>{produto.descricao}</Typography>
      <Button onClick={() => context?.setCarrinho([...context.carrinho, produto])}>
        Adicionar ao Carrinho
      </Button>
    </Container>
  );
};

export default ProdutoDetalhes;
