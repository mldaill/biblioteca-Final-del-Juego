import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"; 
import UsersPage from './pages/UserPage';
import BookPage from "./pages/BookPage";
import ReservationsPage from "./pages/ReservationsPage";
import ContactPage from "./pages/ContactPage";


import React, { useState } from 'react';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
       
        <Header />
        
        <main className="flex-grow mt-20"> {/* Ajusta el margen superior si el header es fijo */}
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/Inicio" element={<HomePage />} />
            <Route path="/Ingreso" element={<LoginPage/>} />
            <Route path="/Libros" element={<BookPage />} />
            <Route path="/Usuarios" element={<UsersPage />} />
            <Route path="/Reservas" element={<ReservationsPage />}/>
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/books/isbn" element={<BookPage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


