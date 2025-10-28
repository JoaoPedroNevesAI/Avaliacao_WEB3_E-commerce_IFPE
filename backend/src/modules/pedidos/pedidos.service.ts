import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Pedido } from './pedido.entity';
import { ItemPedido } from './item-pedido.entity';
import { StatusPedido } from './status-pedido.enum';
import { CarrinhoService, ItemCarrinho } from '../carrinho/carrinho.service';
import { Produto } from '../produtos/produto.entity';
import { Cliente } from '../clientes/cliente.entity';

@Injectable()
export class PedidosService {
  constructor(
    private dataSource: DataSource,
    private carrinhoService: CarrinhoService,
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,
    @InjectRepository(ItemPedido)
    private itemPedidoRepo: Repository<ItemPedido>,
  ) {}

  async criarPedido(clienteId: number): Promise<Pedido> {
    const cliente = await this.dataSource.getRepository(Cliente).findOneBy({ id: clienteId });
    if (!cliente) throw new Error('Cliente não encontrado');

    const carrinho: ItemCarrinho[] = this.carrinhoService.getCarrinho();
    if (carrinho.length === 0) throw new Error('Carrinho vazio');

    const pedido = this.pedidoRepo.create({
      cliente,
      status: StatusPedido.ABERTO,
      itens: [],
    });

    const itensPedido: ItemPedido[] = [];

    for (const item of carrinho) {
      const produto = await this.dataSource.getRepository(Produto).findOneBy({ id: item.produtoId });
      if (!produto) continue;

      const itemPedido = this.itemPedidoRepo.create({
        pedido,
        produto,
        quantidade: item.quantidade,
        subtotal: produto.preco * item.quantidade,
      });

      itensPedido.push(itemPedido);
    }

    pedido.itens = itensPedido;

    await this.pedidoRepo.save(pedido);
    await this.itemPedidoRepo.save(itensPedido);

    this.carrinhoService.limparCarrinho();

    return pedido;
  }

  async listarPedidosDoCliente(clienteId: number): Promise<Pedido[]> {
    return this.pedidoRepo.find({
      where: { cliente: { id: clienteId } },
      relations: ['itens', 'itens.produto', 'cliente'],
    });
  }
}
