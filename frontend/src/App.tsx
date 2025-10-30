import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produtos from './pages/Produtos';
import ProdutoDetalhes from './pages/ProdutoDetalhes';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import Pedidos from './pages/Pedidos';
import Pagamento from './pages/Pagamento';
import Navbar from './components/Navbar';
import { AppProvider } from './context/UseAppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Produtos />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pagamento/:id" element={<Pagamento />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
