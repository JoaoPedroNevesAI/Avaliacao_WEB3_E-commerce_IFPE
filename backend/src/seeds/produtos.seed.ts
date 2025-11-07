import { DataSource } from 'typeorm';
import { Produto } from '../modules/produtos/produto.entity';
import { Categoria } from '../modules/categorias/categoria.entity';

export const seedProdutos = async (dataSource: DataSource) => {
  const produtoRepository = dataSource.getRepository(Produto);
  const categoriaRepository = dataSource.getRepository(Categoria);

  const produtosExistentes = await produtoRepository.count();
  if (produtosExistentes > 0) return;

  const categorias = await categoriaRepository.find();

  const produtosSeed = [
    // 🔹 Tecnologia
    {
      nome: 'Smartphone X',
      descricao: 'Smartphone com tela de 6.5", 128GB de armazenamento e câmera tripla.',
      preco: 2499.90,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Tecnologia'),
    },
    {
      nome: 'Notebook Gamer',
      descricao: 'Notebook com processador Intel i7, 16GB RAM e placa RTX 3060.',
      preco: 5799.00,
      estoque: 10,
      categoria: categorias.find(c => c.nome === 'Tecnologia'),
    },
    {
      nome: 'Fone Bluetooth Pro',
      descricao: 'Fones com cancelamento de ruído ativo e bateria de 30h.',
      preco: 499.99,
      estoque: 3,
      categoria: categorias.find(c => c.nome === 'Tecnologia'),
    },
    {
      nome: 'Smartwatch Fit',
      descricao: 'Relógio inteligente com monitor cardíaco e GPS integrado.',
      preco: 899.90,
      categoria: categorias.find(c => c.nome === 'Tecnologia'),
    },

    // 🔹 Higiene
    {
      nome: 'Sabonete Neutro 90g',
      descricao: 'Sabonete neutro hidratante com extrato de camomila.',
      preco: 4.50,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Higiene'),
    },
    {
      nome: 'Shampoo Anticaspa 400ml',
      descricao: 'Controle eficaz da caspa com sensação refrescante.',
      preco: 19.90,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Higiene'),
    },
    {
      nome: 'Creme Dental Menta 90g',
      descricao: 'Proteção anticáries e hálito fresco.',
      preco: 8.90,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Higiene'),
    },
    {
      nome: 'Desodorante Aerosol 150ml',
      descricao: 'Proteção por 48h e fragrância suave.',
      preco: 14.99,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Higiene'),
    },

    // 🔹 Alimentos
    {
      nome: 'Arroz Branco Tipo 1 5kg',
      descricao: 'Grãos selecionados e soltinhos.',
      preco: 25.90,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Alimentos'),
    },
    {
      nome: 'Feijão Carioca 1kg',
      descricao: 'Feijão de qualidade premium, ideal para o dia a dia.',
      preco: 8.50,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Alimentos'),
    },
    {
      nome: 'Café Torrado e Moído 500g',
      descricao: 'Café forte e encorpado, ideal para o café da manhã.',
      preco: 17.80,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Alimentos'),
    },
    {
      nome: 'Achocolatado em Pó 400g',
      descricao: 'Sabor intenso de chocolate, ideal para crianças.',
      preco: 9.99,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Alimentos'),
    },

    // 🔹 Utilidades Domésticas
    {
      nome: 'Detergente Neutro 500ml',
      descricao: 'Remove a gordura e não agride as mãos.',
      preco: 3.99,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Utilidades Domésticas'),
    },
    {
      nome: 'Esponja Multiuso (4 unidades)',
      descricao: 'Limpeza eficiente e durável.',
      preco: 7.50,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Utilidades Domésticas'),
    },
    {
      nome: 'Papel Toalha 2 rolos',
      descricao: 'Alta absorção e resistência.',
      preco: 6.90,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Utilidades Domésticas'),
    },
    {
      nome: 'Lâmpada LED 9W',
      descricao: 'Econômica e com alta durabilidade.',
      preco: 12.90,
      estoque: 5,
      categoria: categorias.find(c => c.nome === 'Utilidades Domésticas'),
    },
  ];

  await produtoRepository.save(produtosSeed);
  console.log('Seed de produtos executada com sucesso!');
};
