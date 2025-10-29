import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './endereco.entity';
import { Cliente } from '../clientes/cliente.entity';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Endereco, Cliente]),
  ],
  controllers: [EnderecoController],
  providers: [EnderecoService],
})
export class EnderecosModule {}
