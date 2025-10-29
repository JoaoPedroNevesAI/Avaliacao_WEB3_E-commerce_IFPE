import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento, StatusPagamento } from './pagamento.entity';
import { Pedido, StatusPedido } from '../pedidos/pedido.entity';
import { Produto } from '../produtos/produto.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepo: Repository<Pagamento>,
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Produto)
    private produtoRepo: Repository<Produto>,
  ) {}

  async findAll() {
    return this.pagamentoRepo.find({ relations: ['pedido', 'pedido.itens', 'pedido.itens.produto'] });
  }

  async findOne(id: number) {
    const pagamento = await this.pagamentoRepo.findOne({ where: { id }, relations: ['pedido', 'pedido.itens', 'pedido.itens.produto'] });
    if (!pagamento) throw new NotFoundException('Pagamento não encontrado');
    return pagamento;
  }

  async create(dto: CreatePagamentoDto) {
    const pedido = await this.pedidoRepo.findOne({ where: { id: dto.pedidoId }, relations: ['itens', 'itens.produto'] });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    if (pedido.status !== StatusPedido.AGUARDANDO_PAGAMENTO && pedido.status !== StatusPedido.ABERTO) {
      throw new BadRequestException('Pagamento só permitido para pedidos em Aberto ou Aguardando Pagamento');
    }

    const pagamentoExistente = await this.pagamentoRepo.findOne({ where: { pedido, status: StatusPagamento.PENDENTE } });
    if (pagamentoExistente) throw new BadRequestException('Já existe um pagamento pendente para este pedido');

    const pagamento = this.pagamentoRepo.create({ pedido, metodo: dto.metodo, valor: dto.valor, status: StatusPagamento.PENDENTE });

    pedido.status = StatusPedido.AGUARDANDO_PAGAMENTO;
    await this.pedidoRepo.save(pedido);

    return this.pagamentoRepo.save(pagamento);
  }

  async update(id: number, dto: UpdatePagamentoDto) {
    const pagamento = await this.findOne(id);

    if (pagamento.status === StatusPagamento.PAGO || pagamento.status === StatusPagamento.CANCELADO) {
      throw new BadRequestException('Não é permitido alterar pagamento finalizado');
    }

    if (dto.status) {
      pagamento.status = dto.status;

      if (dto.status === StatusPagamento.PAGO) {
        // Atualizar estoque e pedido
        for (const item of pagamento.pedido.itens) {
          item.produto.estoque -= item.quantidade;
          await this.produtoRepo.save(item.produto);
        }
        pagamento.pedido.status = StatusPedido.PAGO;
        await this.pedidoRepo.save(pagamento.pedido);
      }

      if (dto.status === StatusPagamento.CANCELADO) {
        pagamento.pedido.status = StatusPedido.ABERTO;
        await this.pedidoRepo.save(pagamento.pedido);
      }
    }

    return this.pagamentoRepo.save(pagamento);
  }

  async remove(id: number) {
    const pagamento = await this.findOne(id);
    if (pagamento.status === StatusPagamento.PAGO) {
      throw new BadRequestException('Não é permitido remover pagamentos já pagos');
    }
    return this.pagamentoRepo.remove(pagamento);
  }
}
