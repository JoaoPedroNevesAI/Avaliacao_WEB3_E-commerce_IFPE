import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categoria } from '../categorias/categoria.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column('text')
  descricao!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco!: number;

  @Column({ default: 0 })
  estoque!: number;

  @ManyToOne(() => Categoria, categoria => categoria.produtos, { nullable: false })
  categoria!: Categoria;

  @Column({ default: true })
  ativo!: boolean;

  @Column({ nullable: true })
  imagem!: string;
}
