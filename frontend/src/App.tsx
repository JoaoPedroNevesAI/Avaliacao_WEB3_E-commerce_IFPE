import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Produtos from './pages/Produtos';
import Carrinho from './pages/Carrinho';
import Pedidos from './pages/Pedidos';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import Pagamento from './pages/Pagamento';


const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/produtos" />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pagamento" element={<Pagamento />} />
        </Routes>
      </Router>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </AppProvider>
  );
};

export default App;
