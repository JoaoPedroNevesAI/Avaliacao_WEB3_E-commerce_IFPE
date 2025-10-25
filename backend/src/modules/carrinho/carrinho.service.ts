import { Injectable } from '@nestjs/common';

export interface ItemCarrinho {
  id: number;
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
}

@Injectable()
export class CarrinhoService {
  private carrinho: ItemCarrinho[] = [];
  private nextId = 1;

  getCarrinho(): ItemCarrinho[] {
    return this.carrinho;
  }

  adicionarItem(item: { produtoId: number; nome: string; preco: number; quantidade?: number }): ItemCarrinho[] {
    const existente = this.carrinho.find(ci => ci.produtoId === item.produtoId);
    if (existente) {
      existente.quantidade += item.quantidade || 1;
    } else {
      this.carrinho.push({
        id: this.nextId++,
        produtoId: item.produtoId,
        nome: item.nome,
        preco: item.preco,
        quantidade: item.quantidade || 1,
      });
    }
    return this.carrinho;
  }

  atualizarItem(id: number, quantidade: number): ItemCarrinho[] {
    const item = this.carrinho.find(ci => ci.id === id);
    if (item) {
      item.quantidade = quantidade;
      if (item.quantidade <= 0) this.removerItem(id);
    }
    return this.carrinho;
  }

  removerItem(id: number): ItemCarrinho[] {
    this.carrinho = this.carrinho.filter(ci => ci.id !== id);
    return this.carrinho;
  }

  limparCarrinho(): { message: string } {
    this.carrinho = [];
    return { message: 'Carrinho limpo' };
  }
}
