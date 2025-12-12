import { AppDataSource } from '../data-source';

const clearDatabase = async () => {
  const connection = await AppDataSource.initialize();
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`);
  }

  await connection.destroy();
};

clearDatabase();
