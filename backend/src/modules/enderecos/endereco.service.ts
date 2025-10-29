import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './endereco.entity';
import { Cliente } from '../clientes/cliente.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepo: Repository<Endereco>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  async findAll() {
    return this.enderecoRepo.find({ relations: ['cliente'] });
  }

  async findByCliente(clienteId: number) {
    const cliente = await this.clienteRepo.findOne({ where: { id: clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    return this.enderecoRepo.find({ where: { cliente }, relations: ['cliente'] });
  }

  async findOne(id: number) {
    const endereco = await this.enderecoRepo.findOne({ where: { id }, relations: ['cliente'] });
    if (!endereco) throw new NotFoundException('Endereço não encontrado');
    return endereco;
  }

  async create(dto: CreateEnderecoDto) {
    const cliente = await this.clienteRepo.findOne({ where: { id: dto.clienteId }, relations: ['enderecos'] });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    if (dto.principal) {
      for (const end of cliente.enderecos) {
        end.principal = false;
        await this.enderecoRepo.save(end);
      }
    }

    const endereco = this.enderecoRepo.create({ ...dto, cliente });
    return this.enderecoRepo.save(endereco);
  }

  async update(id: number, dto: UpdateEnderecoDto) {
    const endereco = await this.findOne(id);
    if (dto.principal && !endereco.principal) {
      const outros = await this.enderecoRepo.find({ where: { cliente: endereco.cliente } });
      for (const end of outros) {
        if (end.id !== endereco.id) {
          end.principal = false;
          await this.enderecoRepo.save(end);
        }
      }
    }
    Object.assign(endereco, dto);
    return this.enderecoRepo.save(endereco);
  }

  async remove(id: number) {
    const endereco = await this.findOne(id);
    return this.enderecoRepo.remove(endereco);
  }
}
