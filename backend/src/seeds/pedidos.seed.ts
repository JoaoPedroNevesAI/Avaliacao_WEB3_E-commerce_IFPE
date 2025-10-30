import { DataSource } from 'typeorm';
import { Pedido, StatusPedido } from '../modules/pedidos/pedido.entity';
import { ItemPedido } from '../modules/pedidos/item-pedido.entity';
import { Cliente } from '../modules/clientes/cliente.entity';
import { Produto } from '../modules/produtos/produto.entity';

const round2 = (num: number) => Math.round(num * 100) / 100; // arredonda para 2 casas decimais

export const seedPedidos = async (dataSource: DataSource) => {
  const pedidoRepo = dataSource.getRepository(Pedido);
  const clienteRepo = dataSource.getRepository(Cliente);
  const produtoRepo = dataSource.getRepository(Produto);

  const clientes = await clienteRepo.find();
  const produtos = await produtoRepo.find();

  const pedidosExistentes = await pedidoRepo.count();
  if (pedidosExistentes > 0) return;

  const pedido1 = new Pedido();
  pedido1.cliente = clientes[0];
  pedido1.status = StatusPedido.ABERTO;
  pedido1.subtotal = round2(produtos[0].preco * 2 + produtos[1].preco);
  pedido1.total = round2(pedido1.subtotal);
  pedido1.quantidadeTotal = 3;

  const item1 = new ItemPedido();
  item1.produto = produtos[0];
  item1.quantidade = 2;
  item1.precoUnitario = round2(produtos[0].preco);
  item1.subtotal = round2(produtos[0].preco * 2);
  item1.pedido = pedido1;

  const item2 = new ItemPedido();
  item2.produto = produtos[1];
  item2.quantidade = 1;
  item2.precoUnitario = round2(produtos[1].preco);
  item2.subtotal = round2(produtos[1].preco);
  item2.pedido = pedido1;

  pedido1.itens = [item1, item2];

  const pedido2 = new Pedido();
  pedido2.cliente = clientes[1];
  pedido2.status = StatusPedido.AGUARDANDO_PAGAMENTO;
  pedido2.subtotal = round2(produtos[2].preco);
  pedido2.total = round2(produtos[2].preco);
  pedido2.quantidadeTotal = 1;

  const item3 = new ItemPedido();
  item3.produto = produtos[2];
  item3.quantidade = 1;
  item3.precoUnitario = round2(produtos[2].preco);
  item3.subtotal = round2(produtos[2].preco);
  item3.pedido = pedido2;

  pedido2.itens = [item3];

  await pedidoRepo.save([pedido1, pedido2]);
  console.log('Seed de pedidos executada com sucesso!');
};
