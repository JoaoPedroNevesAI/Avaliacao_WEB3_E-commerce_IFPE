import { useCart } from '../contexts/CartContext';

export default function Checkout() {
  const { carrinho, total, removeItem, updateItem, finalizarPedido } = useCart();

  const handleFinalizarPedido = async () => {
    const pedido = await finalizarPedido();
    console.log('Pedido finalizado:', pedido);
  };

  if (carrinho.length === 0) return <p>Seu carrinho está vazio.</p>;

  return (
    <div>
      <h2>Checkout</h2>
      {carrinho.map(item => (
        <div key={item.id}>
          <p>{item.nome}</p>
          <p>Preço unitário: R$ {item.preco.toFixed(2)}</p>
          <p>Quantidade: {item.quantidade}</p>
          <p>Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
          <button onClick={() => updateItem(item.id, item.quantidade + 1)}>+</button>
          <button onClick={() => updateItem(item.id, item.quantidade - 1)}>-</button>
          <button onClick={() => removeItem(item.id)}>Remover</button>
        </div>
      ))}
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={handleFinalizarPedido}>Finalizar Pedido</button>
    </div>
  );
}
