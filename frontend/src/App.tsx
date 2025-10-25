import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import ProductDetails from './pages/ProductDetails';


const App = () => {
  return (
    <Router>
      <Header />
      <nav style={{ display: 'flex' as const, justifyContent: 'center' as const, gap: '15px' as const, margin: '1rem 0' as const }}>
        <Link to="/">Home</Link>
        <Link to="/carrinho">Carrinho</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/pedidos">Pedidos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/pagamento" element={<Payment />} />
        <Route path="/produto/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
