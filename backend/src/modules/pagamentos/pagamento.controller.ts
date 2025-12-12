import { Controller, Post, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { MetodoPagamento } from './pagamento.entity';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly service: PagamentoService) {}

  @Post(':pedidoId')
  create(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Body('metodo') metodo: MetodoPagamento
  ) {
    return this.service.create({
      pedidoId,
      metodo,
      valor: undefined as any
    });
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
