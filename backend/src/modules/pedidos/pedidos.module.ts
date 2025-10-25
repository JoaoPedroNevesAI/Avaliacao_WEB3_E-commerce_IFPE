import { Module } from '@nestjs/common';
import { PedidoService } from './pedidos.service';
import { PedidoController } from './pedidos.controller';
import { CarrinhoModule } from '../carrinho/carrinho.module';

@Module({
  imports: [CarrinhoModule],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
