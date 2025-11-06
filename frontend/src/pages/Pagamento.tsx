import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Pagamento: React.FC = () => {
  const { carrinho, finalizarPedido, limparCarrinho } = useAppContext();
  const navigate = useNavigate();
  const [formaPagamento, setFormaPagamento] = useState('');

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const handleFinalizar = () => {
    if (!formaPagamento) {
      toast.error('Selecione uma forma de pagamento.');
      return;
    }

    finalizarPedido(formaPagamento);
    toast.success('Pedido finalizado com sucesso!');
    navigate('/pedidos');
  };

  const handleCancelar = () => {
    limparCarrinho();
    toast.error('Pedido cancelado.');
    navigate('/produtos');
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <h1>Pagamento</h1>

      <h3>Resumo da Compra</h3>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {carrinho.map((item) => (
              <li key={item.id}>
                {item.nome} — {item.quantidade} x R$ {item.preco.toFixed(2)} = R${' '}
                {(item.preco * item.quantidade).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: R$ {total.toFixed(2)}</h3>
        </>
      )}

      <div style={{ marginTop: 20 }}>
        <h3>Forma de Pagamento</h3>
        <select
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        >
          <option value="">Selecione...</option>
          <option value="Pix">Pix</option>
          <option value="Cartão">Cartão</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleFinalizar}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          Finalizar Pedido
        </button>

        <button
          onClick={handleCancelar}
          style={{
            marginLeft: 10,
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          Cancelar Pedido
        </button>
      </div>
    </div>
  );
};

export default Pagamento;
