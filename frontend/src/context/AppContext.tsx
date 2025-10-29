import { createContext, useState, ReactNode } from 'react';

interface AppContextType {
  carrinho: any[];
  setCarrinho: (carrinho: any[]) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<any[]>([]);

  return (
    <AppContext.Provider value={{ carrinho, setCarrinho }}>
      {children}
    </AppContext.Provider>
  );
};
