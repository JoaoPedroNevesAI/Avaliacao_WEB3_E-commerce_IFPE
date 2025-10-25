import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
}

export default function ProductCard({ id, nome, preco }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ produtoId: id, nome, preco, quantidade: 1 });
  };

  return (
    <div className="card">
      <h3>{nome}</h3>
      <p>R$ {preco.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
    </div>
  );
}
