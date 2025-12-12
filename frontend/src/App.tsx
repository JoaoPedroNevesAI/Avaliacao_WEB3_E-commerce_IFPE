import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Produtos from './pages/Produtos';
import Carrinho from './pages/Carrinho';
import Pedidos from './pages/Pedidos';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import Pagamento from './pages/Pagamento';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={<ProtectedRoute><Navigate to="/produtos" /></ProtectedRoute>}
          />

          <Route
            path="/produtos"
            element={<ProtectedRoute><Produtos /></ProtectedRoute>}
          />

          <Route
            path="/carrinho"
            element={<ProtectedRoute><Carrinho /></ProtectedRoute>}
          />

          <Route
            path="/pedidos"
            element={<ProtectedRoute><Pedidos /></ProtectedRoute>}
          />

          <Route
            path="/pagamento"
            element={<ProtectedRoute><Pagamento /></ProtectedRoute>}
          />
        </Routes>
      </Router>

      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </AppProvider>
  );
};
export default App;
