import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { ItemPedido } from './item-pedido.entity';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { CarrinhoModule } from '../carrinho/carrinho.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, ItemPedido]),
    CarrinhoModule
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports: [PedidosService],
})
export class PedidoModule {}
