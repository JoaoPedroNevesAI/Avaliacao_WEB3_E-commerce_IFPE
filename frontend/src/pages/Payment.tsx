import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

interface ItemPedido {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface Pedido {
  id: number;
  status: string;
  total: number;
  itens: ItemPedido[];
}

const Payment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [metodo, setMetodo] = useState('PIX');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await api.get<Pedido>(`/pedidos/${id}`);
        setPedido(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        alert('Erro ao carregar pedido.');
      }
    };

    fetchPedido();
  }, [id]);

  const handlePagamento = async () => {
    if (!pedido) return;

    try {
      setLoading(true);
      await api.post(`/pagamentos`, {
        pedidoId: pedido.id,
        metodo,
        status: 'Pago',
        valor: pedido.total,
      });

      alert('Pagamento realizado com sucesso!');
      setPedido({ ...pedido, status: 'PAGO' });
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento.');
    } finally {
      setLoading(false);
    }
  };

  if (!pedido) return <p>Carregando pedido...</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h2>Pagamento do Pedido #{pedido.id}</h2>
      <p><strong>Status:</strong> {pedido.status}</p>
      <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>

      <h3>Itens:</h3>
      <ul>
        {pedido.itens.map(item => (
          <li key={item.produtoId}>
            {item.nome} - R$ {item.preco.toFixed(2)} x {item.quantidade}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        <label>
          Método de Pagamento:{' '}
          <select value={metodo} onChange={e => setMetodo(e.target.value)}>
            <option value="Cartão">Cartão</option>
            <option value="Boleto">Boleto</option>
            <option value="PIX">PIX</option>
          </select>
        </label>
      </div>

      <button
        onClick={handlePagamento}
        disabled={loading || pedido.status === 'PAGO'}
        style={{
          marginTop: '1rem',
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        {loading ? 'Processando...' : pedido.status === 'PAGO' ? 'Pago' : 'Finalizar Pagamento'}
      </button>
    </div>
  );
};

export default Payment;
