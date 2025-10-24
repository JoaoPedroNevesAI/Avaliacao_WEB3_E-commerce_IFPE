import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, StatusPedido } from './pedido.entity';
import { ItemPedido } from './item-pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Cliente } from '../clientes/cliente.entity';
import { Endereco } from '../enderecos/endereco.entity';
import { Produto } from '../produtos/produto.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidosRepo: Repository<Pedido>,
    @InjectRepository(ItemPedido) private itensRepo: Repository<ItemPedido>,
    @InjectRepository(Cliente) private clientesRepo: Repository<Cliente>,
    @InjectRepository(Endereco) private enderecosRepo: Repository<Endereco>,
    @InjectRepository(Produto) private produtosRepo: Repository<Produto>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return this.pedidosRepo.find();
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepo.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    return pedido;
  }

  async create(dto: CreatePedidoDto): Promise<Pedido> {
    const cliente = await this.clientesRepo.findOne({ where: { id: dto.clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    const endereco = await this.enderecosRepo.findOne({ where: { id: dto.enderecoId } });
    if (!endereco) throw new NotFoundException('Endereço não encontrado');

    const itens: ItemPedido[] = [];

    let total = 0;
    for (const item of dto.itens) {
      const produto = await this.produtosRepo.findOne({ where: { id: item.produtoId } });
      if (!produto) throw new NotFoundException(`Produto ${item.produtoId} não encontrado`);
      if (produto.estoque < item.quantidade)
        throw new BadRequestException(`Estoque insuficiente para ${produto.nome}`);

      const subtotal = produto.preco * item.quantidade;
      total += subtotal;

      const novoItem = this.itensRepo.create({ produto, quantidade: item.quantidade, subtotal });
      itens.push(novoItem);
    }

    const pedido = this.pedidosRepo.create({ cliente, endereco, itens, total });
    return this.pedidosRepo.save(pedido);
  }

  async update(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    Object.assign(pedido, dto);
    return this.pedidosRepo.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidosRepo.remove(pedido);
  }
}
