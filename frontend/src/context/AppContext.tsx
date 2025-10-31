import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
};

export type ProdutoCarrinho = Produto & {
  quantidade: number;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
};

export type Pedido = {
  id: number;
  data: string;
  itens: ProdutoCarrinho[];
  total: number;
};

export type AppContextType = {
  produtos: Produto[];
  setProdutos: (produtos: Produto[]) => void;
  carrinho: ProdutoCarrinho[];
  usuario: Usuario | null;
  pedidos: Pedido[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (produtoId: number) => void;
  aumentarQuantidade: (produtoId: number) => void;
  diminuirQuantidade: (produtoId: number) => void;
  finalizarCompra: () => void;
  setUsuario: (usuario: Usuario | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = { children: ReactNode };

export const AppProvider = ({ children }: Props) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prev => {
      const existente = prev.find(item => item.id === produto.id);
      if (existente) {
        return prev.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
    toast.success(`${produto.nome} adicionado ao carrinho!`, { duration: 2000 });
  };

  const removerDoCarrinho = (produtoId: number) => {
    const itemRemovido = carrinho.find(item => item.id === produtoId);
    setCarrinho(prev => prev.filter(item => item.id !== produtoId));
    if (itemRemovido) toast.success(`${itemRemovido.nome} removido do carrinho!`, { duration: 2000 });
  };

  const aumentarQuantidade = (produtoId: number) => {
    setCarrinho(prev =>
      prev.map(item =>
        item.id === produtoId ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const diminuirQuantidade = (produtoId: number) => {
    setCarrinho(prev =>
      prev
        .map(item =>
          item.id === produtoId
            ? { ...item, quantidade: Math.max(1, item.quantidade - 1) }
            : item
        )
    );
  };

  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      toast.error('O carrinho está vazio!', { duration: 2000 });
      return;
    }
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const novoPedido: Pedido = {
      id: pedidos.length + 1,
      data: new Date().toLocaleString(),
      itens: [...carrinho],
      total,
    };
    setPedidos(prev => [...prev, novoPedido]);
    setCarrinho([]);
    toast.success('Compra finalizada com sucesso!', { duration: 2000 });
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
        pedidos,
        adicionarAoCarrinho,
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        finalizarCompra,
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
