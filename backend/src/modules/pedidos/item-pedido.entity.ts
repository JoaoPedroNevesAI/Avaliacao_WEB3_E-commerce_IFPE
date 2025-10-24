import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Produto } from '../produtos/produto.entity';

@Entity()
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  pedido: Pedido;

  @ManyToOne(() => Produto, { eager: true })
  produto: Produto;

  @Column()
  quantidade: number;

  @Column({ type: 'decimal' })
  subtotal: number;
}
