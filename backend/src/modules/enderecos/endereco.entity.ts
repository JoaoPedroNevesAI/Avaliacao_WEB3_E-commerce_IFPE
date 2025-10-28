import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Pedido } from '../pedidos/pedido.entity';

@Entity('enderecos')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.enderecos)
  cliente: Cliente;

  @OneToMany(() => Pedido, (pedido) => pedido.endereco)
  pedidos: Pedido[];
}
