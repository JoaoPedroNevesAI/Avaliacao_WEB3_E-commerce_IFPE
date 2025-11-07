import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
    return this.produtoService.findAll({
      categoriaId,
      nome,
      minPreco,
      maxPreco,
    });
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProdutoDto,
  ) {
    return this.produtoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.remove(id);
  }

  @Get(':id/estoque')
  async verificarEstoque(@Param('id', ParseIntPipe) id: number) {
    const produto = await this.produtoService.findOne(id);
    if (!produto) throw new NotFoundException('Produto não encontrado');
    if (produto.estoque <= 0)
      throw new BadRequestException('Produto sem estoque');
    return { disponivel: true, estoque: produto.estoque };
  }

  @Patch(':id/reduzir-estoque')
  async reduzirEstoque(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantidade') quantidade: number,
  ) {
    if (!quantidade || quantidade <= 0) {
      throw new BadRequestException('Quantidade inválida');
    }

    const produto = await this.produtoService.findOne(id);
    if (!produto) throw new NotFoundException('Produto não encontrado');

    if (produto.estoque < quantidade) {
      throw new BadRequestException('Estoque insuficiente');
    }

    const novoEstoque = produto.estoque - quantidade;
    await this.produtoService.update(id, { estoque: novoEstoque });

    return {
      message: `Estoque atualizado com sucesso! Novo estoque: ${novoEstoque}`,
      novoEstoque,
    };
  }
}
