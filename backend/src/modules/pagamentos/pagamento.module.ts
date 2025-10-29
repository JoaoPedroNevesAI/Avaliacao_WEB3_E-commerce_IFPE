import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './pagamento.entity';
import { Pedido } from '../pedidos/pedido.entity';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { Produto } from '../produtos/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagamento, Pedido, Produto]),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentosModule {}
