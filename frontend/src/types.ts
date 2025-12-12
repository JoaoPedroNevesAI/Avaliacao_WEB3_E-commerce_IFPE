export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagem?: string;
  descricao?: string;
}

export interface ItemPedido {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export interface Pedido {
  id: number;
  itens: ItemPedido[];
  valor: number;
  metodo: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}
