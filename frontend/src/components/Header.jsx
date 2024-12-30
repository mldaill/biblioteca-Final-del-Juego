import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Biblioteca Rosarina Final del Juego</h1>
        <div className="space-x-4">
          <Link to="/inicio" className="text-white hover:text-gray-200">Inicio</Link>
          <Link to="/Ingreso" className="text-white hover:text-gray-200">Ingreso</Link>
          <Link to="/libros" className="text-white hover:text-gray-200">Libros</Link>
          <Link to="/usuarios" className="text-white hover:text-gray-200">Usuarios</Link>
          <Link to="/reservas" className="text-white hover:text-gray-200">Reservas</Link>
          <Link to="/contacto" className="text-white hover:text-gray-200">Contacto</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;