import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async criarPedido(@Body('clienteId') clienteId: number): Promise<Pedido> {
    return this.pedidosService.criarPedido(clienteId);
  }

  @Get('cliente/:id')
  async listarPedidosDoCliente(@Param('id') clienteId: number): Promise<Pedido[]> {
    return this.pedidosService.listarPedidosDoCliente(clienteId);
  }
}
