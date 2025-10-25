import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CarrinhoService, ItemCarrinho } from './carrinho.service';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  @Get()
  getCarrinho(): ItemCarrinho[] {
    return this.carrinhoService.getCarrinho();
  }

  @Post()
  adicionarItem(@Body() body: { produtoId: number; nome: string; preco: number; quantidade?: number }): ItemCarrinho[] {
    return this.carrinhoService.adicionarItem(body);
  }

  @Put(':id')
  atualizarItem(@Param('id') id: number, @Body() body: { quantidade: number }): ItemCarrinho[] {
    return this.carrinhoService.atualizarItem(id, body.quantidade);
  }

  @Delete(':id')
  removerItem(@Param('id') id: number): ItemCarrinho[] {
    return this.carrinhoService.removerItem(id);
  }

  @Delete('clear')
  limparCarrinho(): { message: string } {
    return this.carrinhoService.limparCarrinho();
  }
}
