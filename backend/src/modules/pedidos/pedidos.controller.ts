import { Controller, Post, Param, Get } from '@nestjs/common';
import { PedidoService } from './pedidos.service';
import { Pedido } from './pedido.entity';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidosService: PedidoService) {}

  @Post(':clienteId')
  async criarPedido(@Param('clienteId') clienteId: number): Promise<Pedido> {
    return this.pedidosService.criarPedido(clienteId);
  }

  @Get(':clienteId')
  async listarPedidos(@Param('clienteId') clienteId: number): Promise<Pedido[]> {
    return this.pedidosService.listarPedidosDoCliente(clienteId);
  }
}
