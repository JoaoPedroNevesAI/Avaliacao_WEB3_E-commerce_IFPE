import React from 'react';

const Header = () => {
  return (
    <header
      style={{
        background: '#333' as const,
        color: '#fff' as const,
        padding: '1rem' as const,
        textAlign: 'center' as const,
      }}
    >
      <h1>E-commerce</h1>
    </header>
  );
};

export default Header;
