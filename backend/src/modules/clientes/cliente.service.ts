import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  async findAll() {
    return this.clienteRepo.find({ relations: ['enderecos'] });
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepo.findOne({ where: { id }, relations: ['enderecos'] });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    return cliente;
  }

  async findByEmail(email: string) {
    return this.clienteRepo.findOne({ where: { email } });
  }

  async create(dto: CreateClienteDto) {
    const existing = await this.findByEmail(dto.email);
    if (existing) throw new BadRequestException('E-mail já cadastrado');

    const senhaHash = await bcrypt.hash(dto.senha, 10);
    const cliente = this.clienteRepo.create({ ...dto, senha: senhaHash });
    return this.clienteRepo.save(cliente);
  }

  async update(id: number, dto: UpdateClienteDto) {
    const cliente = await this.findOne(id);

    if (dto.email && dto.email !== cliente.email) {
      const existing = await this.findByEmail(dto.email);
      if (existing) throw new BadRequestException('E-mail já cadastrado');
    }

    if (dto.senha) {
      dto.senha = await bcrypt.hash(dto.senha, 10);
    }

    Object.assign(cliente, dto);
    return this.clienteRepo.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    return this.clienteRepo.remove(cliente);
  }

  async login(dto: LoginDto) {
    const cliente = await this.findByEmail(dto.email);
    if (!cliente) throw new BadRequestException('E-mail ou senha inválidos');

    const senhaValida = await bcrypt.compare(dto.senha, cliente.senha);
    if (!senhaValida) throw new BadRequestException('E-mail ou senha inválidos');

    return { id: cliente.id, nome: cliente.nome, email: cliente.email };
  }
}
