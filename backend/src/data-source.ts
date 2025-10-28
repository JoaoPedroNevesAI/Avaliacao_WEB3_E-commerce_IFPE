import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Produto } from './modules/produtos/produto.entity';
import { Categoria } from './modules/categorias/categoria.entity';
import { Cliente } from './modules/clientes/cliente.entity';
import { Pedido } from './modules/pedidos/pedido.entity';
import { ItemPedido } from './modules/pedidos/item-pedido.entity';
import { Endereco } from './modules/enderecos/endereco.entity';
import { Pagamento } from './modules/pagamentos/pagamento.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Sonic2005#',
  database: 'Avaliacao1',
  synchronize: true,
  logging: false,
  entities: [
    Produto,
    Categoria,
    Cliente,
    Pedido,
    ItemPedido,
    Endereco,
    Pagamento,
  ],
});
