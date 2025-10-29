import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('enderecos')
@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Get()
  findAll() {
    return this.enderecoService.findAll();
  }

  @Get('cliente/:clienteId')
  findByCliente(@Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.enderecoService.findByCliente(clienteId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.enderecoService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEnderecoDto) {
    return this.enderecoService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEnderecoDto) {
    return this.enderecoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.enderecoService.remove(id);
  }
}
