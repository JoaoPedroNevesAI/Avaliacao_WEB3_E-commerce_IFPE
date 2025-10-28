import 'reflect-metadata';
import { AppDataSource } from '../src/data-source';
import { Produto } from '../src/modules/produtos/produto.entity';
import { Categoria } from '../src/modules/categorias/categoria.entity';

async function seed() {
  await AppDataSource.initialize();

  const categoriaRepo = AppDataSource.getRepository(Categoria);
  const produtoRepo = AppDataSource.getRepository(Produto);

  const categorias = [
    { nome: 'Roupas' },
    { nome: 'Calçados' },
    { nome: 'Acessórios' },
    { nome: 'Eletrônicos' },
  ];

  const categoriasCriadas: Categoria[] = [];
  for (const c of categorias) {
    const cat = categoriaRepo.create(c);
    await categoriaRepo.save(cat);
    categoriasCriadas.push(cat);
  }

  const produtos = [
    { nome: 'Camiseta Azul', preco: 49.9, descricao: 'Camiseta 100% algodão', categoria: categoriasCriadas[0] },
    { nome: 'Tênis Esportivo', preco: 199.9, descricao: 'Tênis confortável para esportes', categoria: categoriasCriadas[1] },
    { nome: 'Mochila Escolar', preco: 89.9, descricao: 'Mochila resistente e espaçosa', categoria: categoriasCriadas[2] },
    { nome: 'Fone de Ouvido', preco: 129.9, descricao: 'Fone com boa qualidade de som', categoria: categoriasCriadas[3] },
    { nome: 'Relógio Digital', preco: 249.9, descricao: 'Relógio resistente à água', categoria: categoriasCriadas[2] },
  ];

  for (const p of produtos) {
    const produto = produtoRepo.create(p);
    await produtoRepo.save(produto);
  }

  console.log('Seed finalizada!');
  await AppDataSource.destroy();
}

seed();
