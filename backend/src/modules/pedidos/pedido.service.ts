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

  private sanitizePedido(p: Pedido) {
    if (!p) return p;
    const plain: any = JSON.parse(JSON.stringify(p));
    if (plain.cliente && plain.cliente.senha) delete plain.cliente.senha;
    if (Array.isArray(plain.itens)) {
      plain.itens = plain.itens.map((it: any) => {
        if (it.pedido) delete it.pedido;
        return it;
      });
    }
    return plain;
  }

  async findAll() {
    const pedidos = await this.pedidoRepo.find({
      relations: ['cliente', 'itens', 'itens.produto'],
    });
    return pedidos.map(p => this.sanitizePedido(p));
  }

  async findByCliente(clienteId: number) {
    const cliente = await this.clienteRepo.findOne({ where: { id: clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    const pedidos = await this.pedidoRepo.find({
      where: { cliente },
      relations: ['itens', 'itens.produto', 'cliente'],
    });
    return pedidos.map(p => this.sanitizePedido(p));
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['cliente', 'itens', 'itens.produto'],
    });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    return this.sanitizePedido(pedido);
  }

  async create(dto: CreatePedidoDto) {
    const cliente = await this.clienteRepo.findOne({ where: { id: dto.clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    const pedido = this.pedidoRepo.create();
    pedido.cliente = cliente;
    pedido.status = StatusPedido.ABERTO;
    pedido.itens = [];

    let subtotal = 0;
    let quantidadeTotal = 0;

    for (const itemDto of dto.itens) {
      if (!itemDto.quantidade || itemDto.quantidade <= 0) throw new BadRequestException('Quantidade inválida');
      const produto = await this.produtoRepo.findOne({ where: { id: itemDto.produtoId } });
      if (!produto) throw new NotFoundException(`Produto ${itemDto.produtoId} não encontrado`);
      if (!produto.ativo) throw new BadRequestException(`Produto ${produto.nome} inativo`);
      if (produto.estoque < itemDto.quantidade) throw new BadRequestException(`Estoque insuficiente para ${produto.nome}`);

      const item = this.itemRepo.create();
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

    const saved = await this.pedidoRepo.save(pedido);

    const pedidoComRelations = await this.pedidoRepo.findOne({
      where: { id: saved.id },
      relations: ['cliente', 'itens', 'itens.produto'],
    });

    return this.sanitizePedido(pedidoComRelations as Pedido);
  }

  async update(id: number, dto: UpdatePedidoDto) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['cliente', 'itens', 'itens.produto'],
    });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    if (pedido.status === StatusPedido.PAGO) {
      throw new BadRequestException('Pedido pago não pode ser alterado');
    }
    if (dto.status) {
      pedido.status = dto.status as StatusPedido;
    }
    const saved = await this.pedidoRepo.save(pedido);
    return this.sanitizePedido(saved);
  }

  async remove(id: number) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['cliente', 'itens', 'itens.produto'],
    });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    if (pedido.status === StatusPedido.PAGO) {
      throw new BadRequestException('Pedido pago não pode ser removido');
    }
    await this.pedidoRepo.remove(pedido);
    return { message: 'Pedido removido' };
  }
}
