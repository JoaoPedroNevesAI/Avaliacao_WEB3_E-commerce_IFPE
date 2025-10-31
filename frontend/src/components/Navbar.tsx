import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { carrinho } = useAppContext();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#1976d2',
      color: '#fff'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        Meu E-commerce
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <Link 
          to="/produtos" 
          style={{ color: location.pathname === '/produtos' ? '#ffeb3b' : '#fff', textDecoration: 'none' }}
        >
          Produtos
        </Link>

        <Link 
          to="/carrinho" 
          style={{ color: location.pathname === '/carrinho' ? '#ffeb3b' : '#fff', textDecoration: 'none' }}
        >
          Carrinho ({carrinho.length})
        </Link>

        <Link 
          to="/pedidos" 
          style={{ color: location.pathname === '/pedidos' ? '#ffeb3b' : '#fff', textDecoration: 'none' }}
        >
          Pedidos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
