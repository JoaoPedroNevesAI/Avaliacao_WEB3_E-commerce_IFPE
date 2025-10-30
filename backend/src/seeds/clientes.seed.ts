import { DataSource } from 'typeorm';
import { Cliente } from '../modules/clientes/cliente.entity';

export const seedClientes = async (dataSource: DataSource) => {
  const clienteRepository = dataSource.getRepository(Cliente);
  const clientesExistentes = await clienteRepository.count();
  if (clientesExistentes > 0) return;

  const clientesSeed = [
    { nome: 'João Silva', email: 'joao@email.com', senha: '123456', telefone: '99999-0001', dataCadastro: new Date() },
    { nome: 'Maria Oliveira', email: 'maria@email.com', senha: '123456', telefone: '99999-0002', dataCadastro: new Date() },
  ];

  await clienteRepository.save(clientesSeed);
  console.log('Seed de clientes executada!');
};
