import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  categoria?: string | { id: number; nome: string };
  estoque: number;
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
    let mensagem = '';

    setCarrinho(prev => {
      const existente = prev.find(p => p.id === produto.id);

      if (produto.estoque <= 0) {
        mensagem = `Produto "${produto.nome}" está indisponível.`;
        return prev;
      }

      if (existente) {
        if (existente.quantidade >= produto.estoque) {
          mensagem = `Estoque insuficiente para ${produto.nome}.`;
          return prev;
        }
        mensagem = `Quantidade aumentada: ${produto.nome}`;
        return prev.map(p =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }

      mensagem = `Adicionado ao carrinho: ${produto.nome}`;
      return [...prev, { ...produto, quantidade: 1 }];
    });

    if (mensagem.includes('indisponível') || mensagem.includes('insuficiente')) {
      toast.error(mensagem);
    } else {
      toast.success(mensagem);
    }
  };

  const removerDoCarrinho = (id: number) => {
    const removido = carrinho.find(p => p.id === id);
    setCarrinho(prev => prev.filter(p => p.id !== id));
    if (removido) toast.error(`Removido do carrinho: ${removido.nome}`);
  };

  const aumentarQuantidade = (id: number) => {
    let mensagem = '';

    setCarrinho(prev =>
      prev.map(p => {
        if (p.id === id) {
          if (p.quantidade >= p.estoque) {
            mensagem = `Estoque insuficiente para ${p.nome}.`;
            return p;
          }
          mensagem = `Quantidade aumentada: ${p.nome}`;
          return { ...p, quantidade: p.quantidade + 1 };
        }
        return p;
      })
    );

    if (mensagem) {
      if (mensagem.includes('insuficiente')) toast.error(mensagem);
      else toast.success(mensagem);
    }
  };

  const diminuirQuantidade = (id: number) => {
    let removido = '';
    setCarrinho(prev => {
      const novo = prev
        .map(p => {
          if (p.id === id) {
            if (p.quantidade === 1) removido = p.nome;
            return { ...p, quantidade: p.quantidade - 1 };
          }
          return p;
        })
        .filter(p => p.quantidade > 0);
      return novo;
    });

    if (removido) toast.error(`Removido do carrinho: ${removido}`);
  };

  const limparCarrinho = () => setCarrinho([]);

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
      status: 'Finalizado',
    };

    setPedidos(prev => [...prev, novoPedido]);
    setCarrinho([]);
    toast.success('Pedido finalizado com sucesso!');
  };

  const cancelarPedido = (id: number) => {
    setPedidos(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'Cancelado' } : p))
    );
    toast.error('Pedido cancelado!');
  };

  return (
    <AppContext.Provider
      value={{
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
  if (!context)
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  return context;
};
