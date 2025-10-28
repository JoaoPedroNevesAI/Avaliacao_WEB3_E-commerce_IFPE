import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  descricao?: string;
}

interface CartContextData {
  carrinho: Produto[];
  total: number;
  addToCart: (produto: Produto) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateItem: (id: number, quantidade: number) => void;
  finalizarPedido: () => Promise<void>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const addToCart = (produto: Produto) => {
    setCarrinho((prev) => {
      const itemExistente = prev.find((p) => p.id === produto.id);
      if (itemExistente) {
        return prev.map((p) =>
          p.id === produto.id
            ? { ...p, quantidade: p.quantidade + produto.quantidade }
            : p
        );
      }
      return [...prev, produto];
    });
  };

  const removeFromCart = (id: number) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCarrinho([]);

  const updateItem = (id: number, quantidade: number) => {
    setCarrinho((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantidade } : p))
    );
  };

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const finalizarPedido = async () => {
    console.log("Pedido finalizado:", carrinho);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        carrinho,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        updateItem,
        finalizarPedido,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
