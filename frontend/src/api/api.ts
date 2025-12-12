import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagem?: string;
}

export interface ItemPedido {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export interface Pedido {
  id: number;
  clienteId: number;
  itens: ItemPedido[];
  total: number;
  status: string;
  criadoEm: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export const getProdutos = () => api.get<Produto[]>("/produtos");
export const getProdutoById = (id: number) => api.get<Produto>(`/produtos/${id}`);

export const loginCliente = (data: { email: string; senha: string }) =>
  api.post<Usuario>("/clientes/login", data);

export const criarCliente = (data: { nome: string; email: string; senha: string }) =>
  api.post<Usuario>("/clientes", data);

export const getPedidos = () => api.get<Pedido[]>("/pedidos");
export const getPedidoById = (id: number) => api.get<Pedido>(`/pedidos/${id}`);

export const criarPedido = (data: { clienteId: number; itens: ItemPedido[] }) =>
  api.post<Pedido>("/pedidos", data);

export const criarPagamento = (data: { pedidoId: number; metodo: string; valor: number }) =>
  api.post(`/pagamentos/${data.pedidoId}`, {
    metodo: data.metodo,
    valor: data.valor,
  });

export const getPagamentos = () => api.get("/pagamentos");
export const getPagamentoById = (id: number) => api.get(`/pagamentos/${id}`);

export default api;
