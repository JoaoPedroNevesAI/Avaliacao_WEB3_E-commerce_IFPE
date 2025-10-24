import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Pedido } from '../pedidos/pedido.entity';

export enum MetodoPagamento {
  CARTAO = 'Cartão',
  BOLETO = 'Boleto',
  PIX = 'PIX',
}

export enum StatusPagamento {
  PENDENTE = 'Pendente',
  AGUARDANDO_PAGAMENTO = 'AGUARDANDO_PAGAMENTO',
  PAGO = 'Pago',
  CANCELADO = 'Cancelado',
}

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, { eager: true })
  pedido: Pedido;

  @Column({ type: 'enum', enum: MetodoPagamento })
  metodo: MetodoPagamento;

  @Column({ type: 'enum', enum: StatusPagamento, default: StatusPagamento.PENDENTE })
  status: StatusPagamento;

  @Column({ type: 'decimal' })
  valor: number;

  @CreateDateColumn()
  data: Date;
}
