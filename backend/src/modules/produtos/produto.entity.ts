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

  @Column('decimal', {precision: 10,scale: 2,transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  preco!: number;

  @ManyToOne(() => Categoria, categoria => categoria.produtos, { nullable: false })
  categoria!: Categoria;

  @Column({ default: true })
  ativo!: boolean;

  @Column({ nullable: true })
  imagem!: string;

  @Column({ type: 'int', default: 10 })
  estoque!: number
}

