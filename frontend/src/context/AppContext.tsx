import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagem?: string;
  descricao?: string;
};

export type ItemPedido = {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
};

export type LoginResponse = {
  usuario: Usuario;
  token: string;
};

export type Pedido = {
  id: number;
  itens: ItemPedido[];
  valor: number;
  metodo: string;
};

export type AppContextType = {
  usuario: Usuario | null;
  produtos: Produto[];
  pedido: ItemPedido[];
  pedidos: Pedido[];

  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;

  adicionarItem: (produto: Produto) => void;
  aumentarQuantidade: (produtoId: number) => void;
  diminuirQuantidade: (produtoId: number) => void;

  finalizarPedido: (metodo: string) => Promise<void>;
  cancelarPedido: (id: number) => Promise<void>;
};

export const AppContext = createContext({} as AppContextType);

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pedido, setPedido] = useState<ItemPedido[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const login = async (email: string, senha: string) => {
    const res = await axios.post<LoginResponse>(
      "http://localhost:3000/auth/login",
      { email, senha }
    );

    setUsuario(res.data.usuario);
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUsuario(null);
    setPedido([]);
    localStorage.removeItem("token");
  };

  const carregarProdutos = async () => {
    const res = await axios.get<Produto[]>("http://localhost:3000/produtos");
    setProdutos(res.data);
  };

  const carregarPedidos = async () => {
    const res = await axios.get<Pedido[]>("http://localhost:3000/pedidos");
    setPedidos(res.data);
  };

  useEffect(() => {
    carregarProdutos();
    carregarPedidos();
  }, []);

  const adicionarItem = (produto: Produto) => {
    setPedido((atual) => {
      const existente = atual.find((i) => i.produtoId === produto.id);

      if (existente) {
        return atual.map((i) =>
          i.produtoId === produto.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }

      return [
        ...atual,
        {
          produtoId: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: 1,
        },
      ];
    });
  };

  const aumentarQuantidade = (produtoId: number) => {
    setPedido((atual) =>
      atual.map((i) =>
        i.produtoId === produtoId ? { ...i, quantidade: i.quantidade + 1 } : i
      )
    );
  };

  const diminuirQuantidade = (produtoId: number) => {
    setPedido((atual) =>
      atual
        .map((i) =>
          i.produtoId === produtoId
            ? { ...i, quantidade: i.quantidade - 1 }
            : i
        )
        .filter((i) => i.quantidade > 0)
    );
  };

  const finalizarPedido = async (metodo: string) => {
    if (!usuario) return;

    const valor = pedido.reduce(
      (s, item) => s + item.preco * item.quantidade,
      0
    );

    const res = await axios.post<Pedido>("http://localhost:3000/pedidos", {
      itens: pedido,
      valor,
      metodo,
    });

    setPedidos((prev) => [...prev, res.data]);
    setPedido([]);
  };

  const cancelarPedido = async (id: number) => {
    await axios.delete(`http://localhost:3000/pedidos/${id}`);
    setPedidos((p) => p.filter((ped) => ped.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        produtos,
        pedido,
        pedidos,
        login,
        logout,
        adicionarItem,
        aumentarQuantidade,
        diminuirQuantidade,
        finalizarPedido,
        cancelarPedido,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
