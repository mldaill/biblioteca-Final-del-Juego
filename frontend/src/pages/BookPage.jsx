// src/pages/BookPage.jsx
import React from "react";
import BookCard from "../components/BookCard";
import elPrincipito from "../assetsfront/elPrincipito.png";
import alamosTalados from "../assetsfront/alamosTalados.png";
import marianela from "../assetsfront/marianela.png";
import elClub from "../assetsfront/elClub.png";


function BookPage() {
    const books = [
        {
            isbn: "9788478887194",
            title: "El Principito",
            author: "Antoine de Saint-Exupéry",
            published_year: 1943,
            category_id: "Novela",
            image: elPrincipito
        },

        {
            isbn: "9781400000111",
            title: "Álamos Talados",
            author: "Abelardo Arias",
            published_year: 1953,
            category_id: "Novela",
            image: alamosTalados
        },


        {
            isbn: "9788497403201",
            title:"Marianela",
            author: "Benito Pérez Galdós",
            published_year: 1878,
            category_id: "Novela",
            image: marianela

        },

        {
            isbn: "9788490709935",
            title: "El Club de las 5 de la Mañana",
            author: "Robin Sharma",
            published_year: 2018,
            category_id: "Autoayuda",
            image: elClub
        },

    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Libros disponibles</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {books.map((book) => (
                    <BookCard
                        key={book.isbn}
                        title={book.title}
                        author={book.author}
                        ublished_year={book.published_year}
                        image={book.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default BookPage;
