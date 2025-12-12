import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../modules/clientes/cliente.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    private jwtService: JwtService,
  ) {}

  async register(dto: { nome: string; email: string; senha: string }) {
    const existing = await this.clienteRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('E-mail já cadastrado');

    const hash = await bcrypt.hash(dto.senha, 10);
    const cliente = this.clienteRepo.create({ nome: dto.nome, email: dto.email, senha: hash, role: 'cliente' });
    await this.clienteRepo.save(cliente);
    const token = this.signToken(cliente);
    return { usuario: this.sanitize(cliente), token };
  }

  async validateUser(email: string, senha: string) {
    const cliente = await this.clienteRepo.findOne({ where: { email } });
    if (!cliente) return null;
    const ok = await bcrypt.compare(senha, cliente.senha);
    if (!ok) return null;
    return cliente;
  }

  signToken(cliente: Cliente) {
    const payload = { sub: cliente.id, email: cliente.email, role: cliente.role, nome: cliente.nome };
    return this.jwtService.sign(payload);
  }

  sanitize(cliente: Cliente) {
    const { senha, ...rest } = cliente as any;
    return rest;
  }

  async login(email: string, senha: string) {
    const cliente = await this.validateUser(email, senha);
    if (!cliente) throw new UnauthorizedException('E-mail ou senha inválidos');
    const token = this.signToken(cliente);
    return { usuario: this.sanitize(cliente), token };
  }

  async meFromPayload(payload: any) {
    const cliente = await this.clienteRepo.findOne({ where: { id: payload.sub } });
    if (!cliente) throw new UnauthorizedException('Usuário não encontrado');
    return this.sanitize(cliente);
  }
}
