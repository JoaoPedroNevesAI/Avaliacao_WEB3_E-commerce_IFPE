import React from "react";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  id: number;
  nome: string;
  preco: number;
}

export default function ProductCard({ id, nome, preco }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, nome, preco, quantidade: 1 });
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <h3>{nome}</h3>
      <p>R$ {preco.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        style={{
          background: "#007bff",
          color: "#fff",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
