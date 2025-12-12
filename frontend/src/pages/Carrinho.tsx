import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {
  const {
    pedido,
    aumentarQuantidade,
    diminuirQuantidade
  } = useContext(AppContext);

  const navigate = useNavigate();

  const total = pedido.reduce(
    (s, item) => s + item.preco * item.quantidade,
    0
  );

  return (
    <div>
      <h2>Carrinho</h2>

      {pedido.length === 0 && <p>Seu carrinho está vazio.</p>}

      {pedido.map((item) => (
        <div key={item.produtoId}>
          <p>
            {item.nome} — R$ {item.preco} — qtd: {item.quantidade}
          </p>
          <button onClick={() => diminuirQuantidade(item.produtoId)}>-</button>
          <button onClick={() => aumentarQuantidade(item.produtoId)}>+</button>
        </div>
      ))}

      {pedido.length > 0 && (
        <>
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <button onClick={() => navigate("/pagamento")}>
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}
