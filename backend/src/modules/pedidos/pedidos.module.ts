import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './pedido.entity';
import { ItemPedido } from './item-pedido.entity';
import { Cliente } from '../clientes/cliente.entity';
import { Endereco } from '../enderecos/endereco.entity';
import { Produto } from '../produtos/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, ItemPedido, Cliente, Endereco, Produto])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
