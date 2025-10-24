import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './pagamento.entity';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';
import { Pedido } from '../pedidos/pedido.entity';
import { Produto } from '../produtos/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Pedido, Produto])],
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentosModule {}
