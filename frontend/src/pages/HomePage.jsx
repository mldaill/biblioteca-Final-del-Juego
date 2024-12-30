// HomePage.js
import React from "react";
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen relative">

      {/* Usamos el componente Header */}
      <Header />

      {/* Frase centrada debajo del Header */}
      <section className="pt-24 text-center italic text-3xl text-pink-200">
        <p>"Entre las páginas, lo imposible se hace posible. El juego final es solo el comienzo de lo inexplorado."</p>
      </section>

      {/* Hero Section */}
      <section className="relative text-center py-20 px-4 mt-8">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 h-full w-full" style={{ backgroundImage: "url('/hojas.jpg')" }}></div>
        <h2 className="text-white text-5xl font-extrabold mb-4">Bienvenido a tu biblioteca</h2>
        <p className="text-white text-lg mb-8">Investigá, reservá y disfrutá de miles de libros en un solo lugar.</p>
        <Link to="/libros">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg text-xl hover:bg-blue-400 transform hover:translate-y-1 transition-all">
            Buscar libros
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Iniciar Sesión */}
          <Link to="/Ingreso" className="text-center block hover:cursor-pointer">
            <div className="bg-purple-500  text-white p-6 rounded-full mx-auto mb-4  hover:bg-purple-400 transform hover:translate-y-1 transition-all ">
              <i className="fas fa-sign-in-alt text-3xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 hover:text-purple-500 transition-all">
              Iniciar sesión
            </h3>
            <p>Sumate a nuestra comunidad</p>
          </Link>

          {/* Favorito del mes */}
          <div className="text-center">
            <Link to="/books/9781400000111" className="text-center block hover:cursor-pointer">
              <div className="bg-yellow-500 text-white p-6 rounded-full mx-auto mb-4  hover:bg-yellow-400 transform hover:translate-y-1 transition-all">
                <i className="fas fa-star text-3xl"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 hover:text-yellow-500 transition-all">Favorito del mes</h3>
              <p>Conocé que título va ganando como el más elegido</p>
            </Link>
          </div>

          {/* Reservar */}
          <Link to="/Reservas" className="text-center block hover:cursor-pointer">
            <div className="bg-teal-500 text-white p-6 rounded-full mx-auto mb-4  hover:bg-teal-400 transform hover:translate-y-1 transition-all">
              <i className="fas fa-history text-3xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 hover:text-teal-500 transition-all">Reservar</h3>
            <p>Realiza tu primer reserva, elegí tu propia aventura</p>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Biblioteca Final del Juego. Todos los derechos reservados.</p>
          <div className="space-x-6 mt-4">
            <a href="#facebook" className="hover:text-gray-400">Facebook</a>
            <a href="#twitter" className="hover:text-gray-400">Twitter</a>
            <a href="#instagram" className="hover:text-gray-400">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

