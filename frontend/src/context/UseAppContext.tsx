import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Produto = {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
};

export type AppContextType = {
  produtos: Produto[];
  setProdutos: (produtos: Produto[]) => void;
  carrinho: Produto[];
  adicionarAoCarrinho: (produto: Produto) => void;
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = { children: ReactNode };

export const AppProvider = ({ children }: Props) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prev => [...prev, produto]);
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch('http://localhost:3000/produtos');
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        const data: Produto[] = await res.json();
        setProdutos(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProdutos();
  }, []);

  return (
    <AppContext.Provider
      value={{ produtos, setProdutos, carrinho, adicionarAoCarrinho, usuario, setUsuario }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext precisa estar dentro de um AppProvider');
  return context;
};
