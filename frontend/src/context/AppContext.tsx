import React, { createContext, useState, ReactNode, useContext } from 'react';

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
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

export const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = { children: ReactNode };

export const AppProvider = ({ children }: Props) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prev => [...prev, produto]);
  };

  return (
    <AppContext.Provider
      value={{ produtos, setProdutos, carrinho, adicionarAoCarrinho, usuario, setUsuario }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook para consumir o contexto
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext deve ser usado dentro de AppProvider');
  return context;
};
