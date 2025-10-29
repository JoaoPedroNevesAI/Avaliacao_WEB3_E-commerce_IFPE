import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { ItemPedido } from '../pedidos/item-pedido.entity';
import { Cliente } from '../clientes/cliente.entity';
import { Produto } from '../produtos/produto.entity';
import { PedidoService } from './pedido.service';
import { PedidoController }from './pedido.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, ItemPedido, Cliente, Produto]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidosModule {}
