import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Pedidos() {
  const { pedidos, cancelarPedido } = useContext(AppContext);

  // Cálculo seguro do total baseado nos itens do pedido
  const calcularTotal = (pedido: any) => {
    if (!pedido.itens) return 0;

    return pedido.itens.reduce((acc: number, item: any) => {
      const preco = Number(item.preco ?? 0);
      const qtd = Number(item.quantidade ?? 1);
      return acc + preco * qtd;
    }, 0);
  };

  return (
    <div>
      <h2>Pedidos</h2>

      {pedidos.length === 0 && <p>Nenhum pedido realizado.</p>}

      {pedidos.map((p: any) => (
        <div
          key={p.id}
          style={{ border: "1px solid #aaa", padding: 10, margin: 10 }}
        >
          <p>ID: {p.id}</p>

          <p>
            Valor Total: R$ {calcularTotal(p).toFixed(2)}
          </p>

          <p>Método: {p.metodo ?? "Não selecionado"}</p>

          <h4>Itens:</h4>
          {p.itens?.map((i: any) => (
            <p key={i.produtoId}>
              {i.quantidade}x {i.nome} — R$ {Number(i.preco ?? 0).toFixed(2)}
            </p>
          ))}

          <button onClick={() => cancelarPedido(p.id)}>
            Cancelar Pedido
          </button>
        </div>
      ))}
    </div>
  );
}
