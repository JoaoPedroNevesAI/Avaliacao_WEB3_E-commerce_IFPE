import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  categoria?: string | { id: number; nome: string };
};

export interface ProdutoCarrinho extends Produto {
  quantidade: number;
}

export interface Pedido {
  id: number;
  data: string;
  itens: ProdutoCarrinho[];
  total: number;
  formaPagamento: string;
  status: string;
}

export interface AppContextType {
  produtos: Produto[];
  carrinho: ProdutoCarrinho[];
  pedidos: Pedido[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (id: number) => void;
  aumentarQuantidade: (id: number) => void;
  diminuirQuantidade: (id: number) => void;
  limparCarrinho: () => void;
  finalizarPedido: (formaPagamento: string) => void;
  cancelarPedido: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [produtos] = useState<Produto[]>([
    { id: 1, nome: 'Camiseta React', descricao: 'Camiseta estilosa de React', preco: 79.9 },
    { id: 2, nome: 'Caneca TypeScript', descricao: 'Caneca para devs TypeScript', preco: 49.9 },
    { id: 3, nome: 'Adesivo JavaScript', descricao: 'Adesivo para seu notebook', preco: 9.9 },
  ]);

  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>(() => {
    const saved = localStorage.getItem('carrinho');
    return saved ? JSON.parse(saved) : [];
  });

  const [pedidos, setPedidos] = useState<Pedido[]>(() => {
    const saved = localStorage.getItem('pedidos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prev => {
      const existente = prev.find(p => p.id === produto.id);
      if (existente) {
        toast.success(`Quantidade aumentada: ${produto.nome}`);
        return prev.map(p =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      toast.success(`Adicionado ao carrinho: ${produto.nome}`);
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id: number) => {
    const removido = carrinho.find(p => p.id === id);
    if (removido) toast.error(`Removido do carrinho: ${removido.nome}`);
    setCarrinho(prev => prev.filter(p => p.id !== id));
  };

  const aumentarQuantidade = (id: number) => {
    setCarrinho(prev =>
      prev.map(p => (p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p))
    );
  };

  const diminuirQuantidade = (id: number) => {
    setCarrinho(prev =>
      prev
        .map(p => (p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p))
        .filter(p => p.quantidade > 0)
    );
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const finalizarPedido = (formaPagamento: string) => {
    if (carrinho.length === 0) {
      toast.error('Carrinho vazio!');
      return;
    }

    const total = carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );

    const novoPedido: Pedido = {
      id: pedidos.length + 1,
      data: new Date().toLocaleString(),
      itens: carrinho,
      total,
      formaPagamento,
      status: 'Aguardando Pagamento',
    };

    setPedidos(prev => [...prev, novoPedido]);
    setCarrinho([]);
    toast.success('Pedido finalizado com sucesso!');
  };

  const cancelarPedido = (id: number) => {
    setPedidos(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status: 'Cancelado' } : p
      )
    );
    toast.error('Pedido cancelado!');
  };

  return (
    <AppContext.Provider
      value={{
        produtos,
        carrinho,
        pedidos,
        adicionarAoCarrinho,
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        limparCarrinho,
        finalizarPedido,
        cancelarPedido,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  return context;
};
