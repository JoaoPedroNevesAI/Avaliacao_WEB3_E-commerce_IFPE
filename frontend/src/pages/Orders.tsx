import React from 'react';

const Orders = () => {
  const pedidos = [
    { id: 1, status: 'PAGO', total: 6099.89 },
    { id: 2, status: 'AGUARDANDO PAGAMENTO', total: 299.0 },
  ];

  return (
    <main style={{ padding: '2rem' as const }}>
      <h2>Meus Pedidos</h2>
      {pedidos.map((p) => (
        <div key={p.id} style={{ border: '1px solid #ccc' as const, borderRadius: '8px' as const, padding: '10px' as const, marginBottom: '10px' as const }}>
          <p><b>Pedido #{p.id}</b></p>
          <p>Status: {p.status}</p>
          <p>Total: R$ {p.total.toFixed(2)}</p>
        </div>
      ))}
    </main>
  );
};

export default Orders;
