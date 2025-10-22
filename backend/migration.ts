import 'ts-node/register';
import 'tsconfig-paths/register';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('DataSource initialized');
  })
  .catch((err) => {
    console.error('Error during DataSource initialization', err);
  });
