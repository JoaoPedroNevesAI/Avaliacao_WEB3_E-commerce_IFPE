import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateProdutoDto) {
    return this.produtosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProdutoDto) {
    return this.produtosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
