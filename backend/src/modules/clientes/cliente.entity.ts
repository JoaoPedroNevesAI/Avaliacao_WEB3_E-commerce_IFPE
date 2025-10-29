import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Endereco } from '../enderecos/endereco.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string; // futuramente criptografar

  @Column({ nullable: true })
  telefone: string;

  @CreateDateColumn()
  dataCadastro: Date;

  @OneToMany(() => Endereco, endereco => endereco.cliente)
  enderecos: Endereco[];
}
