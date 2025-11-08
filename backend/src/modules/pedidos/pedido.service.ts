import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, StatusPedido } from './pedido.entity';
import { ItemPedido } from '../pedidos/item-pedido.entity';
import { Produto } from '../produtos/produto.entity';
import { Cliente } from '../clientes/cliente.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,
    @InjectRepository(ItemPedido)
    private itemRepo: Repository<ItemPedido>,
    @InjectRepository(Produto)
    private produtoRepo: Repository<Produto>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  async findAll() {
    return this.pedidoRepo.find({
      relations: ['cliente', 'itens', 'itens.produto'],
    });
  }

  async findByCliente(clienteId: number) {
    const cliente = await this.clienteRepo.findOne({ where: { id: clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    return this.pedidoRepo.find({
      where: { cliente },
      relations: ['itens', 'itens.produto'],
    });
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['cliente', 'itens', 'itens.produto'],
    });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    return pedido;
  }

async create(dto: CreatePedidoDto) {
  const cliente = await this.clienteRepo.findOne({ where: { id: dto.clienteId } });
  if (!cliente) throw new NotFoundException('Cliente não encontrado');

  const pedido = new Pedido();
  pedido.cliente = cliente;
  pedido.status = StatusPedido.ABERTO;
  pedido.itens = [];

  let subtotal = 0;
  let quantidadeTotal = 0;

  for (const itemDto of dto.itens) {
    const produto = await this.produtoRepo.findOne({ where: { id: itemDto.produtoId } });
    if (!produto) throw new NotFoundException(`Produto ${itemDto.produtoId} não encontrado`);
    if (!produto.ativo) throw new BadRequestException(`Produto ${produto.nome} inativo`);
    if (produto.estoque < itemDto.quantidade) throw new BadRequestException(`Estoque insuficiente para ${produto.nome}`);

    produto.estoque -= itemDto.quantidade;
    await this.produtoRepo.save(produto);

    const item = new ItemPedido();
    item.produto = produto;
    item.quantidade = itemDto.quantidade;
    item.precoUnitario = Number(produto.preco);
    item.subtotal = Number(produto.preco) * itemDto.quantidade;
    item.pedido = pedido;

    pedido.itens.push(item);

    subtotal += item.subtotal;
    quantidadeTotal += item.quantidade;
  }

  pedido.subtotal = subtotal;
  pedido.total = subtotal;
  pedido.quantidadeTotal = quantidadeTotal;

  const pedidoSalvo = await this.pedidoRepo.save(pedido);

  return {
    message: 'Pedido criado com sucesso!',
    pedido: pedidoSalvo,
  };
}


  async update(id: number, dto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);

    if (pedido.status === StatusPedido.PAGO) {
      throw new BadRequestException('Pedido pago não pode ser alterado');
    }

    if (dto.status === StatusPedido.CANCELADO) {
      for (const item of pedido.itens) {
        item.produto.estoque += item.quantidade;
        await this.produtoRepo.save(item.produto);
      }
    }

    if (dto.status) {
      pedido.status = dto.status as StatusPedido;
    }

    return this.pedidoRepo.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    if (pedido.status === StatusPedido.PAGO) {
      throw new BadRequestException('Pedido pago não pode ser removido');
    }
    return this.pedidoRepo.remove(pedido);
  }
}
