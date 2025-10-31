import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Produtos from './pages/Produtos';
import Carrinho from './pages/Carrinho';
import Pedidos from './pages/Pedidos';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </AppProvider>
  );
};

export default App;
