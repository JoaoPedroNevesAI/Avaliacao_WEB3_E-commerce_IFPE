import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from '../categorias/categoria.entity';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @Column('decimal')
  preco: number;

  @Column()
  estoque: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
  categoria: Categoria;
}
