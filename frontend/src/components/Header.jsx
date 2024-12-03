import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Final del Juego</h1>
        <ul className="flex space-x-4">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/books">Libros</Link></li>
          <li><Link to="/users">Usuarios</Link></li>
          <li><Link to="/reservations">Reservas</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
