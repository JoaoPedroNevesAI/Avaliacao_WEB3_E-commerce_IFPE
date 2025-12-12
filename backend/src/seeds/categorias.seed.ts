import { DataSource } from 'typeorm';
import { Categoria } from '../modules/categorias/categoria.entity';

export const seedCategorias = async (dataSource: DataSource) => {
  const categoriaRepository = dataSource.getRepository(Categoria);
  const categoriasSeed = [
    { nome: 'Tecnologia', descricao: 'Produtos eletrônicos e gadgets.' },
    { nome: 'Higiene', descricao: 'Produtos de higiene pessoal.' },
    { nome: 'Alimentos', descricao: 'Alimentos e bebidas.' },
    { nome: 'Utilidades Domésticas', descricao: 'Produtos para casa e limpeza.' },
  ];

  await categoriaRepository.save(categoriasSeed);
};
