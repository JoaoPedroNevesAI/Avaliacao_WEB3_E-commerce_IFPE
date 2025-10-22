import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from '../produtos/produto.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
