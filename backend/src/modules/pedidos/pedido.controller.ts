import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get('cliente/:clienteId')
  findByCliente(@Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.pedidoService.findByCliente(clienteId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePedidoDto) {
    return this.pedidoService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePedidoDto) {
    return this.pedidoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.remove(id);
  }
}
