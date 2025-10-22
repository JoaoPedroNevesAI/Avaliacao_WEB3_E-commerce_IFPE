import { DataSource } from 'typeorm';
import { Produto } from './src/modules/produtos/produto.entity';
import { Categoria } from './src/modules/categorias/categoria.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Sonic2005#',
  database: 'Avaliação1',
  entities: [Produto, Categoria],
  synchronize: false,
});
