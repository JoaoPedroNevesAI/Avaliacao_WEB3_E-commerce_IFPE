import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto, UpdateProdutoDto } from './dto/produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produtosService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProdutoDto) {
    return this.produtosService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProdutoDto) {
    return this.produtosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtosService.remove(id);
  }
}
