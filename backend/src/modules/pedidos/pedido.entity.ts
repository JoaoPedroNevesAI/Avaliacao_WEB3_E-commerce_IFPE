import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { ItemPedido } from '../pedidos/item-pedido.entity';

export enum StatusPedido {
  ABERTO = 'ABERTO',
  AGUARDANDO_PAGAMENTO = 'AGUARDANDO_PAGAMENTO',
  PAGO = 'PAGO',
  CANCELADO = 'CANCELADO',
}

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.enderecos, { nullable: false })
  cliente: Cliente;

  @OneToMany(() => ItemPedido, item => item.pedido, { cascade: true })
  itens: ItemPedido[];

  @Column({ type: 'enum', enum: StatusPedido, default: StatusPedido.ABERTO })
  status: StatusPedido;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ default: 0 })
  quantidadeTotal: number;

  @CreateDateColumn()
  dataCriacao: Date;
}
