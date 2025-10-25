import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Pedido, StatusPedido } from './pedido.entity';
import { ItemPedido } from './item-pedido.entity';
import { Produto } from '../produtos/produto.entity';
import { Cliente } from '../clientes/cliente.entity';
import { CarrinhoService, ItemCarrinho } from '../carrinho/carrinho.service';

@Injectable()
export class PedidoService {
  constructor(
    private dataSource: DataSource,
    private carrinhoService: CarrinhoService,
  ) {}

  async criarPedido(clienteId: number): Promise<Pedido> {
    const clienteRepo = this.dataSource.getRepository(Cliente);
    const produtoRepo = this.dataSource.getRepository(Produto);
    const pedidoRepo = this.dataSource.getRepository(Pedido);
    const itemPedidoRepo = this.dataSource.getRepository(ItemPedido);

    const cliente = await clienteRepo.findOneBy({ id: clienteId });
    if (!cliente) throw new Error('Cliente não encontrado');

    const carrinho: ItemCarrinho[] = this.carrinhoService.getCarrinho();
    if (carrinho.length === 0) throw new Error('Carrinho vazio');

    const pedido = pedidoRepo.create({
      cliente,
      total: 0,
      itens: [],
      status: StatusPedido.ABERTO, // uso correto do enum
    });

    let total = 0;

    for (const item of carrinho) {
      const produto = await produtoRepo.findOneBy({ id: item.produtoId });
      if (!produto) throw new Error(`Produto ${item.produtoId} não encontrado`);
      if (!produto.ativo) throw new Error(`Produto ${produto.nome} está inativo`);
      if (produto.estoque < item.quantidade)
        throw new Error(`Estoque insuficiente para ${produto.nome}`);

      const itemPedido = itemPedidoRepo.create({
        pedido,
        produto,
        quantidade: item.quantidade,
        subtotal: produto.preco * item.quantidade,
      });

      pedido.itens.push(itemPedido);
      total += itemPedido.subtotal;
    }

    pedido.total = total;
    await pedidoRepo.save(pedido);

    this.carrinhoService.limparCarrinho();

    return pedido;
  }

  async listarPedidosDoCliente(clienteId: number): Promise<Pedido[]> {
    const pedidoRepo = this.dataSource.getRepository(Pedido);
    const pedidos = await pedidoRepo.find({
      where: { cliente: { id: clienteId } },
      relations: ['itens', 'itens.produto'],
      order: { id: 'DESC' },
  });

    return pedidos;
  }

}
