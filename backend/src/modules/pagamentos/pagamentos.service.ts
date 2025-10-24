import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento, StatusPagamento } from './pagamento.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { Pedido, StatusPedido } from '../pedidos/pedido.entity';
import { Produto } from '../produtos/produto.entity';

@Injectable()
export class PagamentosService {
  constructor(
    @InjectRepository(Pagamento) private pagamentosRepo: Repository<Pagamento>,
    @InjectRepository(Pedido) private pedidosRepo: Repository<Pedido>,
    @InjectRepository(Produto) private produtosRepo: Repository<Produto>,
  ) {}

  // Criar pagamento
  async create(dto: CreatePagamentoDto): Promise<Pagamento> {
    const pedido = await this.pedidosRepo.findOne({
      where: { id: dto.pedidoId },
      relations: ['itens', 'itens.produto'],
    });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    if (
      pedido.status !== StatusPedido.ABERTO &&
      pedido.status !== StatusPedido.AGUARDANDO_PAGAMENTO
    )
      throw new BadRequestException('Pagamento só pode ser criado para pedidos em Aberto ou Aguardando Pagamento');

    const pagamentoExistente = await this.pagamentosRepo.findOne({ where: { pedido } });
    if (pagamentoExistente) throw new BadRequestException('Pagamento já existe para este pedido');

    const pagamento = this.pagamentosRepo.create({
      pedido,
      metodo: dto.metodo,
      valor: dto.valor,
    });

    return this.pagamentosRepo.save(pagamento);
  }

  // Atualizar pagamento
  async update(id: number, dto: UpdatePagamentoDto): Promise<Pagamento> {
    const pagamento = await this.pagamentosRepo.findOne({
      where: { id },
      relations: ['pedido', 'pedido.itens', 'pedido.itens.produto'],
    });
    if (!pagamento) throw new NotFoundException('Pagamento não encontrado');

    if (pagamento.status === StatusPagamento.PAGO)
      throw new BadRequestException('Não é possível alterar um pagamento já pago');

    pagamento.status = dto.status;

    // Regras de negócio
    if (dto.status === StatusPagamento.PAGO) {
      pagamento.pedido.status = StatusPedido.PAGO;

      // Atualiza estoque
      for (const item of pagamento.pedido.itens) {
        item.produto.estoque -= item.quantidade;
        await this.produtosRepo.save(item.produto);
      }
    } else if (dto.status === StatusPagamento.CANCELADO) {
      pagamento.pedido.status = StatusPedido.ABERTO;
    }

    await this.pedidosRepo.save(pagamento.pedido);
    return this.pagamentosRepo.save(pagamento);
  }

  // Listar todos os pagamentos
  async findAll(): Promise<Pagamento[]> {
    return this.pagamentosRepo.find();
  }

  // Buscar pagamento por ID
  async findOne(id: number): Promise<Pagamento> {
    const pagamento = await this.pagamentosRepo.findOne({ where: { id } });
    if (!pagamento) throw new NotFoundException('Pagamento não encontrado');
    return pagamento;
  }
}
