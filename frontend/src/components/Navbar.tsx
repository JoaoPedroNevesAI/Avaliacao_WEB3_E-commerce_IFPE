import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { usuario, logout, pedido } = useContext(AppContext);

  return (
    <nav style={{ display: "flex", gap: 20, padding: 10, background: "#ddd" }}>
      <Link to="/">Home</Link>
      <Link to="/produtos">Produtos</Link>
      <Link to="/carrinho">Carrinho ({pedido.length})</Link>
      <Link to="/pedidos">Pedidos</Link>
      {usuario ? (
        <>
          <span>Olá, {usuario.nome}</span>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
