import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { Categoria } from '../categorias/categoria.entity';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Produto, Categoria]),
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutosModule {}
