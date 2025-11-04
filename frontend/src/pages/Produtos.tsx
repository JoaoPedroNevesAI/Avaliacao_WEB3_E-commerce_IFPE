import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

interface Categoria {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria?: Categoria;
}

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    axios.get<Categoria[]>('http://localhost:3000/categorias')
      .then((res) => setCategorias(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await axios.get<Produto[]>('http://localhost:3000/produtos', {
          params: {
          nome: busca || undefined,
          categoriaId: categoria || undefined,
          },
        });
        setProdutos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProdutos();
  }, [busca, categoria]);

  return (
    <div style={{ maxWidth: 900, margin: '20px auto' }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: 20 }}>
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
            onChange={(e) => setCategoria(e.target.value)}
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

      {produtos.map((p) => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: 20, marginBottom: 15 }}>
          <h3>{p.nome}</h3>
          <p>{p.descricao}</p>
          <p>
            <strong>Preço:</strong> R$ {p.preco.toFixed(2)}
          </p>
          <p>
            <em>Categoria:</em> {p.categoria?.nome ?? 'Sem categoria'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Produtos;
