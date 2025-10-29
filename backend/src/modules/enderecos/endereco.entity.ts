import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rua: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column({ default: false })
  principal: boolean;

  @ManyToOne(() => Cliente, cliente => cliente.enderecos, { nullable: false })
  cliente: Cliente;
}
