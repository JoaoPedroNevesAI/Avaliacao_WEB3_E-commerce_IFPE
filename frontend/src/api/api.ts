import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: { 'Content-Type': 'application/json' },
});

// Produtos
export const getProdutos = () => api.get('/produtos');
export const getProdutoById = (id: number) => api.get(`/produtos/${id}`);

// Clientes
export const loginCliente = (data: { email: string; senha: string }) =>
  api.post('/clientes/login', data);

export const criarCliente = (data: { nome: string; email: string; senha: string }) =>
  api.post('/clientes', data);

// Pedidos
export const getPedidos = () => api.get('/pedidos');
export const getPedidoById = (id: number) => api.get(`/pedidos/${id}`);
export const criarPedido = (data: { itens: { produtoId: number; quantidade: number }[] }) =>
  api.post('/pedidos', data);

// Pagamentos
export const criarPagamento = (data: { pedidoId: number; metodo: string }) =>
  api.post(`/pagamentos/${data.pedidoId}`, { metodo: data.metodo });

export const getPagamentos = () => api.get('/pagamentos');
export const getPagamentoById = (id: number) => api.get(`/pagamentos/${id}`);
