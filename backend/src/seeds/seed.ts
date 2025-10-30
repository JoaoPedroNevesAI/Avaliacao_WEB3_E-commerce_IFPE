import { AppDataSource } from '../data-source';
import { seedCategorias } from './categorias.seed';
import { seedProdutos } from './produtos.seed';
import { seedClientes } from './clientes.seed';
import { seedEnderecos } from './enderecos.seed';
import { seedPedidos } from './pedidos.seed';
import { seedPagamentos } from './pagamentos.seed';

const runSeeds = async () => {
  await AppDataSource.initialize();

  await seedCategorias(AppDataSource);
  await seedProdutos(AppDataSource);
  await seedClientes(AppDataSource);
  await seedPedidos(AppDataSource);
  await seedPagamentos(AppDataSource);
  await seedEnderecos(AppDataSource);

  console.log('Todas as seeds executadas com sucesso!');
  await AppDataSource.destroy();
};

runSeeds();
