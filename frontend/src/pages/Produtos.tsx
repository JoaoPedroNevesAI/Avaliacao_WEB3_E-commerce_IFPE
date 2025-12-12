import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAppContext } from "../context/AppContext";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagem?: string;
}

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { adicionarItem } = useAppContext();

  const carregar = async () => {
    const res = await api.get("/produtos");
    setProdutos(res.data as Produto[]);
  };

  useEffect(() => {
    carregar();

    const interval = setInterval(() => {
      carregar();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAdicionar = (p: Produto) => {
    adicionarItem(p);
  };

  return (
    <div>
      <h1>Produtos</h1>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {produtos.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 20,
              width: 250,
            }}
          >
            {p.imagem && (
              <img
                src={p.imagem}
                alt={p.nome}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
            )}

            <h3>{p.nome}</h3>
            <p>Preço: R$ {p.preco.toFixed(2)}</p>
            <p>Estoque: {p.estoque}</p>

            <button onClick={() => handleAdicionar(p)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produtos;
