import { DataSource } from 'typeorm';
import { Endereco } from '../modules/enderecos/endereco.entity';
import { Cliente } from '../modules/clientes/cliente.entity';

export const seedEnderecos = async (dataSource: DataSource) => {
  const enderecoRepository = dataSource.getRepository(Endereco);
  const clienteRepository = dataSource.getRepository(Cliente);


  const clientes = await clienteRepository.find();

  const enderecosSeed = [
    {
      rua: 'Rua A, 100',
      cidade: 'Recife',
      estado: 'PE',
      cep: '50000-000',
      principal: true,
      cliente: clientes[0]
    },
    {
      rua: 'Rua B, 200',
      cidade: 'Olinda',
      estado: 'PE',
      cep: '53000-000',
      principal: true,
      cliente: clientes[1]
    }
  ];

  await enderecoRepository.save(enderecosSeed);
};
