import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categoria } from '../categorias/categoria.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal')
  preco: number;

  @Column({ default: 0 })
  estoque: number;

  @ManyToOne(() => Categoria, categoria => categoria.produtos)
  categoria: Categoria;

  @Column({ default: true })
  ativo: boolean;
}
