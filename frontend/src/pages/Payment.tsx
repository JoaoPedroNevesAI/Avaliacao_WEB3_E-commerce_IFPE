import React from 'react';

const Payment = () => {
  return (
    <main style={{ padding: '2rem' as const, textAlign: 'center' as const }}>
      <h2>Pagamento</h2>
      <p>Escolha a forma de pagamento:</p>
      <div style={{ display: 'flex' as const, justifyContent: 'center' as const, gap: '15px' as const, marginTop: '20px' as const }}>
        <button style={{ padding: '10px 15px' as const, background: '#007bff' as const, color: '#fff' as const, border: 'none', borderRadius: '5px' as const, cursor: 'pointer' as const }}>Cartão de Crédito</button>
        <button style={{ padding: '10px 15px' as const, background: '#007bff' as const, color: '#fff' as const, border: 'none', borderRadius: '5px' as const, cursor: 'pointer' as const }}>Pix</button>
        <button style={{ padding: '10px 15px' as const, background: '#007bff' as const, color: '#fff' as const, border: 'none', borderRadius: '5px' as const, cursor: 'pointer' as const }}>Boleto</button>
      </div>
    </main>
  );
};

export default Payment;
