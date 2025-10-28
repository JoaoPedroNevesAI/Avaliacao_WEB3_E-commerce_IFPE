import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { ItemPedido } from './item-pedido.entity';
import { StatusPedido } from './status-pedido.enum';
import { Endereco } from '../enderecos/endereco.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente;

  @ManyToOne(() => Endereco, (endereco) => endereco.pedidos, { nullable: true })
  endereco: Endereco;

  @OneToMany(() => ItemPedido, (item) => item.pedido, { cascade: true })
  itens: ItemPedido[];

  @Column({
    type: 'enum',
    enum: StatusPedido,
    default: StatusPedido.ABERTO,
  })
  status: StatusPedido;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;
}

export { StatusPedido } from './status-pedido.enum';
