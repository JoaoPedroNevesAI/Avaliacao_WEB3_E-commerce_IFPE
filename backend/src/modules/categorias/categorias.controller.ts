import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateCategoriaDto) {
    return this.categoriasService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
