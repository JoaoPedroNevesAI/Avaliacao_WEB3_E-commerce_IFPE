import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Pagamento() {
  const { pedido, finalizarPedido } = useContext(AppContext);
  const navigate = useNavigate();

  const [metodo, setMetodo] = useState("cartao");

  const total = pedido.reduce(
    (s, item) => s + item.preco * item.quantidade,
    0
  );

  const confirmar = async () => {
    await finalizarPedido(metodo);
    navigate("/pedidos");
  };

  return (
    <div>
      <h2>Pagamento</h2>

      {pedido.map((item) => (
        <p key={item.produtoId}>
          {item.quantidade}x {item.nome} — R$ {item.preco}
        </p>
      ))}

      <h3>Total: R$ {total.toFixed(2)}</h3>

      <h3>Escolha o método de pagamento:</h3>

      <label>
        <input
          type="radio"
          value="cartao"
          checked={metodo === "cartao"}
          onChange={(e) => setMetodo(e.target.value)}
        />
        Cartão
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="pix"
          checked={metodo === "pix"}
          onChange={(e) => setMetodo(e.target.value)}
        />
        Pix
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="dinheiro"
          checked={metodo === "dinheiro"}
          onChange={(e) => setMetodo(e.target.value)}
        />
        Dinheiro
      </label>

      <br /><br />

      <button onClick={confirmar}>Confirmar Pagamento</button>
    </div>
  );
}
