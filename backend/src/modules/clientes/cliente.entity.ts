import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Endereco } from '../enderecos/endereco.entity';
import { Pedido } from '../pedidos/pedido.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefone: string;

  @Column({ nullable: true })
  cpf?: string;

@OneToMany(() => Endereco, (endereco) => endereco.cliente)
enderecos: Endereco[];

@OneToMany(() => Pedido, (pedido) => pedido.cliente)
pedidos: Pedido[];
}