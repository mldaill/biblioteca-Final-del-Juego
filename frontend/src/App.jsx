import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage"; 
import BookPage from "./pages/BookPage";
import UsersPage from "./pages/UsersPage";
import ReservationsPage from "./pages/ReservationsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BookPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

