import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Carrinho: React.FC = () => {
  const {
    carrinho,
    removerDoCarrinho,
    limparCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
  } = useAppContext();

  const navigate = useNavigate();

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const irParaPagamento = () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }
    navigate('/pagamento');
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <h1>Meu Carrinho</h1>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ccc',
                padding: '10px 0',
              }}
            >
              <div>
                <strong>{item.nome}</strong>
                <p>
                  R$ {Number(item.preco).toFixed(2)} x {item.quantidade} = R${' '}
                  {(item.preco * item.quantidade).toFixed(2)}
                </p>
              </div>
              <div>
                <button onClick={() => diminuirQuantidade(item.id)}>-</button>
                <button onClick={() => aumentarQuantidade(item.id)}>+</button>
                <button
                  onClick={() => removerDoCarrinho(item.id)}
                  style={{ marginLeft: 5 }}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <div style={{ marginTop: 20 }}>
            <button onClick={irParaPagamento}>Ir para Pagamento</button>
            <button onClick={limparCarrinho} style={{ marginLeft: 10 }}>
              Limpar Carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrinho;
