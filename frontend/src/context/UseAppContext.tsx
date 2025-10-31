import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Categoria = {
  id: number;
  nome: string;
};

export type Produto = {
  id: number;
  nome: string;
  preco: number | string;
  descricao?: string;
  categoria: Categoria;
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
  usuario: Usuario | null;
  adicionarAoCarrinho: (produto: Produto) => void;
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
    const carregarProdutos = async () => {
      try {
        const res = await fetch('http://localhost:3000/produtos');
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        const data: Produto[] = await res.json();
        setProdutos(data);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
      }
    };

    carregarProdutos();
  }, []);

  return (
    <AppContext.Provider
      value={{
        produtos,
        setProdutos,
        carrinho,
        usuario,
        setUsuario,
        adicionarAoCarrinho,
      }}
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
