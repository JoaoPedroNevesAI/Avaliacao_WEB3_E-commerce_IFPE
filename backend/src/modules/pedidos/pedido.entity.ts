import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Endereco } from '../enderecos/endereco.entity';
import { ItemPedido } from './item-pedido.entity';

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

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos, { eager: true })
  cliente: Cliente;

  @ManyToOne(() => Endereco, { eager: true })
  endereco: Endereco;

  @OneToMany(() => ItemPedido, (item) => item.pedido, { cascade: true, eager: true })
  itens: ItemPedido[];

  @Column({ type: 'enum', enum: StatusPedido, default: StatusPedido.ABERTO })
  status: StatusPedido;

  @Column({ type: 'decimal', default: 0 })
  total: number;

  @CreateDateColumn()
  dataCriacao: Date;
}
