import { AppDataSource } from '../data-source';
import { seedCategorias } from './categorias.seed';
import { seedProdutos } from './produtos.seed';
import { seedClientes } from './clientes.seed';
import { seedEnderecos } from './enderecos.seed';
import { seedPedidos } from './pedidos.seed';
import { seedPagamentos } from './pagamentos.seed';

const runSeeds = async () => {
  await AppDataSource.initialize();

  await AppDataSource.query('DELETE FROM item_pedido');
  await AppDataSource.query('DELETE FROM pagamento');
  await AppDataSource.query('DELETE FROM pedido');
  await AppDataSource.query('DELETE FROM endereco');
  await AppDataSource.query('DELETE FROM cliente');
  await AppDataSource.query('DELETE FROM produto');
  await AppDataSource.query('DELETE FROM categorias');

  await seedCategorias(AppDataSource);
  await seedProdutos(AppDataSource);
  await seedClientes(AppDataSource);
  await seedEnderecos(AppDataSource);
  await seedPedidos(AppDataSource);
  await seedPagamentos(AppDataSource);

  await AppDataSource.destroy();
};

runSeeds();
