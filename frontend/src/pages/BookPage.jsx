// src/pages/BookPage.jsx
import React, { useState } from "react";
import BookCard from "../components/BookCard";
import elPrincipito from "../assetsfront/elPrincipito.png";
import alamosTalados from "../assetsfront/alamosTalados.png";
import marianela from "../assetsfront/marianela.png";
import elClub from "../assetsfront/elClub.png";

function BookPage() {
    const [selectedSynopsis, setSelectedSynopsis] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const books = [
        {
            isbn: "9788478887194",
            title: "El Principito",
            author: "Antoine de Saint-Exupéry",
            published_year: 1943,
            category_id: "Novela",
            description: (
                <p>
                    El Principito narra la historia de un niño príncipe que vive en un pequeño asteroide y que cae a la Tierra, donde conoce a un piloto varado en el desierto. Ambos entablan una conversación en clave poética donde hablan de filosofía, de crítica social, del amor, del honor y de mucho de lo que nos hace humanos.
                </p>
            ),
            image: elPrincipito
        },

        {
            isbn: "9781400000111",
            title: "Álamos Talados",
            author: "Abelardo Arias",
            published_year: 1953,
            category_id: "Novela",
            description: (
                <p>
                    Álamos Talados cuenta un idealizado amor juvenil en unas vacaciones mendocinas.
                </p>
            ),
            image: alamosTalados
        },

        {
            isbn: "9788497403201",
            title: "Marianela",
            author: "Benito Pérez Galdós",
            published_year: 1878,
            category_id: "Novela",
            description: (
                <p>
                    Marianela nos cuenta la trágica vida de la joven Nela, huérfana de quince años, pobre, fea y deforme, enamorada de Pablo, de familia adinerada, hermoso joven de diecinueve años, dotado de todas las perfecciones posibles, pero ciego. Convencido de que todo lo bueno debe ser hermoso, Pablo declara su amor a Marianela. Pero la llegada al pueblo de un oftalmólogo dispuesto a operar a Pablo para devolverle la vista arroja malos presagios sobre la relación entre ambos jóvenes.
                    Con estos elementos de clara raigambre romántica teje Galdós una trama conmovedora que muy pronto cautiva al lector. Sin embargo, Marianela es mucho más que una simple historia de amor, pues el novelista pretende despertar la conciencia de sus lectores. Su indignación se dirige contra quienes reverencian el progreso pero olvidan socorrer a los necesitados y contra el deplorable materialismo de una sociedad que confunde la caridad con el ocio, relega los valores morales y niega a los sentimientos el peso decisivo que deberían tener en la vida.
                </p>
            ),
            image: marianela
        },

        {
            isbn: "9788490709935",
            title: "El Club de las 5 de la Mañana",
            author: "Robin Sharma",
            published_year: 2018,
            category_id: "Autoayuda",
            description: (
                <p>
                    El Club de las 5 de la mañana es la innovadora e increíble historia de dos personas que desean mejorar la productividad, la prosperidad y la serenidad en esta época de distracciones digitales y de abrumadora complejidad, y conocen a un magnate extraño pero fantástico.
                </p>
            ),
            image: elClub
        }
    ];

    const openSynopsis = (synopsis) => {
        setSelectedSynopsis(synopsis);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openReserve = (title) => {
        alert("Redirigiendo a la página de reservas...");
        // acá agregar lógica para redirigir a la página de reservas
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Libros disponibles</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {books.map((book) => (
                    <BookCard
                        key={book.isbn}
                        title={book.title}
                        author={book.author}
                        published_year={book.published_year}
                        image={book.image}
                        openSynopsis={() => openSynopsis(book.description)}
                        openReserve={() => openReserve(book.title)}
                    />
                ))}
            </div>

            {/* Ventana emergente (Modal) */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md w-1/2">
                        <h2 className="text-xl font-bold mb-2">Sinopsis:</h2>
                        <div>{selectedSynopsis}</div>
                        <button
                            className="mt-4 bg-red-500 text-white p-2 rounded"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookPage;
