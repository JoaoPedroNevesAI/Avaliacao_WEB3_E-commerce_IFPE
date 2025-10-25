import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: 'center' as const,
        padding: '1rem' as const,
        background: '#333' as const,
        color: '#fff' as const,
        marginTop: '2rem' as const,
      }}
    >
      <p>E-commerce © 2025 - Todos os direitos reservados</p>
    </footer>
  );
};

export default Footer;
