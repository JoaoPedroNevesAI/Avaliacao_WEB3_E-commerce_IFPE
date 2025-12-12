import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem?: string;
}

interface CartContextType {
  itens: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (produtoId: number) => void;
  updateQuantidade: (produtoId: number, qtd: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [itens, setItens] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(itens));
  }, [itens]);

  const addItem = (item: CartItem) => {
    setItens((prev) => {
      const existente = prev.find((i) => i.produtoId === item.produtoId);

      if (existente) {
        return prev.map((i) =>
          i.produtoId === item.produtoId
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i
        );
      }

      return [...prev, item];
    });
  };

  const removeItem = (produtoId: number) => {
    setItens((prev) => prev.filter((i) => i.produtoId !== produtoId));
  };

  const updateQuantidade = (produtoId: number, qtd: number) => {
    if (qtd <= 0) return;

    setItens((prev) =>
      prev.map((i) =>
        i.produtoId === produtoId ? { ...i, quantidade: qtd } : i
      )
    );
  };

  const clearCart = () => setItens([]);

  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{ itens, addItem, removeItem, updateQuantidade, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return ctx;
};
