import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface CartItem {
  id: number;
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartContextType {
  carrinho: CartItem[];
  total: number;
  addItem: (item: { produtoId: number; nome: string; preco: number; quantidade?: number }) => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, quantidade: number) => void;
  finalizarPedido: () => Promise<any>;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const fetchCart = async () => {
    const res = await axios.get('http://localhost:3000/carrinho');
    setCarrinho(res.data);
    setTotal(res.data.reduce((acc: number, item: CartItem) => acc + item.preco * item.quantidade, 0));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (item: { produtoId: number; nome: string; preco: number; quantidade?: number }) => {
    await axios.post('http://localhost:3000/carrinho', { ...item, quantidade: item.quantidade || 1 });
    fetchCart();
  };

  const removeItem = async (id: number) => {
    await axios.delete(`http://localhost:3000/carrinho/${id}`);
    fetchCart();
  };

  const updateItem = async (id: number, quantidade: number) => {
    await axios.put(`http://localhost:3000/carrinho/${id}`, { quantidade });
    fetchCart();
  };

  const finalizarPedido = async () => {
    if (carrinho.length === 0) return;

    const pedidoRes = await axios.post('http://localhost:3000/pedidos', {
      clienteId: 1,
      itens: carrinho.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
      })),
    });

    await axios.delete('http://localhost:3000/carrinho/clear');
    setCarrinho([]);
    setTotal(0);

    return pedidoRes.data;
  };

  return (
    <CartContext.Provider value={{ carrinho, total, addItem, removeItem, updateItem, finalizarPedido }}>
      {children}
    </CartContext.Provider>
  );
};
