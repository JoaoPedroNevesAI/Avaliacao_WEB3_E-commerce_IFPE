import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from '../pedidos/pedido.entity';
import { Produto } from '../produtos/produto.entity';

@Entity()
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.itens, { nullable: false })
  pedido: Pedido;

  @ManyToOne(() => Produto, { nullable: false })
  produto: Produto;

  @Column()
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precoUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
}
