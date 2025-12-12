import { DataSource } from 'typeorm';
import { Cliente } from '../modules/clientes/cliente.entity';
import * as bcrypt from 'bcrypt';

export const seedClientes = async (dataSource: DataSource) => {
  const clienteRepository = dataSource.getRepository(Cliente);


  const senhaHash = await bcrypt.hash('123456', 10);

  const clientesSeed = [
    {
      nome: 'João Silva',
      email: 'joao@email.com',
      senha: senhaHash,
      telefone: '99999-0001',
      dataCadastro: new Date()
    },
    {
      nome: 'Maria Oliveira',
      email: 'maria@email.com',
      senha: senhaHash,
      telefone: '99999-0002',
      dataCadastro: new Date()
    }
  ];

  await clienteRepository.save(clientesSeed);
};
