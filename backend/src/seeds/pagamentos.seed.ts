import { DataSource } from 'typeorm';
import { Pagamento, StatusPagamento, MetodoPagamento } from '../modules/pagamentos/pagamento.entity';
import { Pedido } from '../modules/pedidos/pedido.entity';

export const seedPagamentos = async (dataSource: DataSource) => {
  const pagamentoRepo = dataSource.getRepository(Pagamento);
  const pedidoRepo = dataSource.getRepository(Pedido);

  const pedidos = await pedidoRepo.find({ relations: ['itens', 'cliente'] });

  const pagamentosExistentes = await pagamentoRepo.count();
  if (pagamentosExistentes > 0) return;

  const pagamentosSeed: Partial<Pagamento>[] = pedidos.map(pedido => ({
    pedido,
    metodo: MetodoPagamento.CARTAO as MetodoPagamento,
    status: StatusPagamento.PENDENTE as StatusPagamento,
    valor: pedido.total,
    data: new Date(),
  }));

  await pagamentoRepo.save(pagamentosSeed);
  console.log('Seed de pagamentos executada com sucesso!');
};
