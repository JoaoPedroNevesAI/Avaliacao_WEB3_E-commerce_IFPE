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
    return this.pagamentoRepo.find({
      relations: ['pedido', 'pedido.itens', 'pedido.itens.produto'],
    });
  }

  async findOne(id: number) {
    const pagamento = await this.pagamentoRepo.findOne({
      where: { id },
      relations: ['pedido', 'pedido.itens', 'pedido.itens.produto'],
    });
    if (!pagamento) throw new NotFoundException('Pagamento não encontrado');
    return pagamento;
  }

  async create(dto: CreatePagamentoDto) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id: dto.pedidoId },
      relations: ['itens', 'itens.produto'],
    });

    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    if (
      pedido.status !== StatusPedido.ABERTO &&
      pedido.status !== StatusPedido.AGUARDANDO_PAGAMENTO
    ) {
      throw new BadRequestException('Pagamento só permitido para pedidos abertos');
    }

    const pendente = await this.pagamentoRepo.findOne({
      where: { pedido, status: StatusPagamento.PENDENTE },
    });

    if (pendente) {
      throw new BadRequestException('Já existe um pagamento pendente');
    }

    const pagamento = this.pagamentoRepo.create({
      pedido,
      metodo: dto.metodo,
      valor: dto.valor ?? pedido.total,
      status: StatusPagamento.PENDENTE,
    });

    pedido.status = StatusPedido.AGUARDANDO_PAGAMENTO;
    await this.pedidoRepo.save(pedido);

    return this.pagamentoRepo.save(pagamento);
  }

  async update(id: number, dto: UpdatePagamentoDto) {
    const pagamento = await this.findOne(id);

    if (
      pagamento.status === StatusPagamento.PAGO ||
      pagamento.status === StatusPagamento.CANCELADO
    ) {
      throw new BadRequestException('Não é possível alterar pagamento finalizado');
    }

    if (dto.status === StatusPagamento.PAGO) {
      for (const item of pagamento.pedido.itens) {
        const produtoDb = await this.produtoRepo.findOne({
          where: { id: item.produto.id },
        });

        if (!produtoDb) {
          throw new NotFoundException(`Produto ${item.produto.id} não encontrado`);
        }

        if (produtoDb.estoque < item.quantidade) {
          throw new BadRequestException(
            `Estoque insuficiente para o produto ${produtoDb.nome}`,
          );
        }
      }

      for (const item of pagamento.pedido.itens) {
        const produtoDb = await this.produtoRepo.findOne({
          where: { id: item.produto.id },
        });

        if (!produtoDb) {
          throw new NotFoundException(`Produto ${item.produto.id} não encontrado`);
        }

        produtoDb.estoque -= item.quantidade;
        await this.produtoRepo.save(produtoDb);
      }

      pagamento.pedido.status = StatusPedido.PAGO;
      await this.pedidoRepo.save(pagamento.pedido);

      pagamento.status = StatusPagamento.PAGO;
    }

    if (dto.status === StatusPagamento.CANCELADO) {
      pagamento.pedido.status = StatusPedido.ABERTO;
      await this.pedidoRepo.save(pagamento.pedido);
      pagamento.status = StatusPagamento.CANCELADO;
    }

    if (
      dto.status !== undefined &&
      dto.status !== StatusPagamento.PAGO &&
      dto.status !== StatusPagamento.CANCELADO
    ) {
      pagamento.status = dto.status;
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
