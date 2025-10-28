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
import { CartProvider } from './contexts/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <nav
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            margin: '1rem 0',
          }}
        >
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
    </CartProvider>
  );
};

export default App;
