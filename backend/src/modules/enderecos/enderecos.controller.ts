import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Get()
  findAll() {
    return this.enderecosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecosService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateEnderecoDto) {
    return this.enderecosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateEnderecoDto) {
    return this.enderecosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecosService.remove(+id);
  }
}
