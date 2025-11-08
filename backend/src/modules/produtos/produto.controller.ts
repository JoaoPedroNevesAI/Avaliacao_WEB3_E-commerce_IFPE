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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProdutoDto) {
    return this.produtoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.remove(id);
  }

  /**
   * Upload de imagem e vinculação ao produto
   */
  @Patch(':id/imagem')
  @UseInterceptors(
    FileInterceptor('imagem', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dir = './uploads';
          // Garante que a pasta existe
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadImagem(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Nenhum arquivo enviado');

    const produto = await this.produtoService.findOne(id);
    if (!produto) throw new NotFoundException('Produto não encontrado');

    const imagemUrl = `/uploads/${file.filename}`;
    await this.produtoService.update(id, { imagem: imagemUrl });

    return {
      message: 'Imagem enviada e vinculada ao produto com sucesso!',
      imagemUrl,
    };
  }
}
