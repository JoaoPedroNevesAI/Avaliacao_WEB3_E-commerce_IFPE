import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Pedido } from '../pedidos/pedido.entity';

export enum MetodoPagamento {
  CARTAO = 'CARTÃO',
  BOLETO = 'BOLETO',
  PIX = 'PIX',
}

export enum StatusPagamento {
  PENDENTE = 'PENDENTE',
  PAGO = 'PAGO',
  CANCELADO = 'CANCELADO',
}

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Pedido, { nullable: false })
  pedido!: Pedido;

  @Column({ type: 'enum', enum: MetodoPagamento })
  metodo!: MetodoPagamento;

  @Column({ type: 'enum', enum: StatusPagamento, default: StatusPagamento.PENDENTE })
  status!: StatusPagamento;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor!: number;

  @CreateDateColumn()
  data!: Date;
}
