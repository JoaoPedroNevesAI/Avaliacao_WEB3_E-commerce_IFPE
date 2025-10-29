import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  findAll(
    @Query('categoriaId') categoriaId?: number,
    @Query('nome') nome?: string,
    @Query('minPreco') minPreco?: number,
    @Query('maxPreco') maxPreco?: number,
  ) {
    return this.produtoService.findAll({ categoriaId, nome, minPreco, maxPreco });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProdutoDto) {
    return this.produtoService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProdutoDto) {
    return this.produtoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.remove(id);
  }
}
