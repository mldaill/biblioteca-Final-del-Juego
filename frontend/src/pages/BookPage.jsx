import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";


function BookPage() {
    const [selectedSynopsis, setSelectedSynopsis] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Estado para alternar entre ver/editar
    const [editedSynopsis, setEditedSynopsis] = useState("");
    const [currentBook, setCurrentBook] = useState(null);
    const [showForm, setShowForm] = useState(false); // Estado para controlar los formularios
    const [formType, setFormType] = useState(""); // Tipo de formulario: "create", "edit", "delete"
    const [bookDetails, setBookDetails] = useState({ title: " ", author: " ", isbn: " ", published_year: " ", category_id: " ", cover: null, description: " " });
    const [isAdmin, setIsAdmin] = useState(true);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();


    // Función para obtener los libros desde la API
    const fetchBooks = async () => {
        try {
            const response = await fetch(`http://localhost:3000/books`);
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                console.error("Error al obtener los libros");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3000/books`)
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error("Error al obtener libros:", error));
    }, []);


    const toggleAdminModal = () => {
        setShowModal(!showModal);
    };

    const openCreateBookForm = () => {
        setFormType("create");
        setBookDetails({ title: "", author: "", isbn: "" });
        setShowForm(true);
    };

    const openEditBookForm = (book) => {
        setFormType("edit");
        setBookDetails({ ...book });
        setShowForm(true);
    };

    const openDeleteBookForm = (book) => {
        setFormType("delete");
        setCurrentBook(book);
        setShowForm(true);
    };

    const handleSaveBook = async (e) => {
        e.preventDefault();

        if (formType === "create") {
            const newBook = {
                title: bookDetails.title,
                author: bookDetails.author,
                isbn: bookDetails.isbn,
                published_year: bookDetails.published_year,
                category_id: bookDetails.category_id,
                description: bookDetails.description,
            };
            const params = new URLSearchParams({
                title: bookDetails.title,
                author: bookDetails.author,
                isbn: bookDetails.isbn,
                published_year: bookDetails.published_year,
                category_id: bookDetails.category_id,
                description: bookDetails.description,
            })
            const formData = new FormData()
            // formData.append("book", JSON.stringify(newBook))

            // Agregar los detalles del libro al FormData
            for (const key in newBook) {
                formData.append(key, newBook[key]);
            }

            // Agregar el archivo de portada al FormData
            const coverFile = document.querySelector('input[type="file"]'); // Suponiendo que el input de la portada sea un archivo
            if (coverFile && coverFile.files[0]) {
                formData.append('cover', coverFile.files[0]);
            }

            try {
                const response = await fetch(`http://localhost:3000/books?${params.toString()}`, {
                    method: "POST",
                    body: formData
                });
                console.log(response)
                console.log(await response.json())
                if (response.ok) {
                    alert(`Libro creado: ${bookDetails.title}`);
                    fetchBooks(); // Vuelve a cargar los libros después de crear uno nuevo
                } else {
                    alert("Error al crear el libro.");
                }
            } catch (error) {
                alert("Error en la solicitud: " + error.message);
            }
        } else if (formType === "edit") {
            alert(`Libro editado: ${bookDetails.title}`);
            fetchBooks(); // Vuelve a cargar los libros después de editar uno
        }

        setShowForm(false);
    };
    const handleSearchBook = async () => {
        try {
            const response = await fetch(`http://localhost:3000/books/${bookDetails.isbn}`);
            if (response.ok) {
                const book = await response.json();
                // Si se encuentra el libro, mostramos el formulario de edición
                setBookDetails({
                    title: book.title,
                    author: book.author,
                    isbn: book.isbn,
                    published_year: book.published_year,
                    category_id: book.category_id,
                    description: book.description,
                    cover: book.cover,
                });
                setFormType("edit"); // Cambiamos el tipo de formulario a "edit"
                setShowForm(true); // Mostramos el formulario
            } else {
                alert("Libro no encontrado");
            }
        } catch (error) {
            alert("Error en la búsqueda del libro: " + error.message);
        }
    };

    const handleDeleteBook = (isbn) => {
        fetch(`http://localhost:3000/books/${isbn}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    alert("Libro eliminado");
                    setBooks(books.filter((book) => book.isbn !== isbn));
                } else {
                    alert("Error al eliminar el libro");
                }
            })
            .catch((error) => {
                console.error("Error al eliminar el libro:", error);
                alert("Error al eliminar el libro");
            });
    };
    
    


    const closeModal = () => {
        setShowModal(false);
        setIsEditing(false);
    };

    const openSynopsis = (synopsis) => {
        setSelectedSynopsis(<p>{synopsis}</p>); // Pasa la sinopsis a selectedSynopsis
        setEditedSynopsis(synopsis); // Almacena la sinopsis para edición
        setShowModal(true); // Muestra el modal
    };


    const saveChanges = () => {
        alert("Sinopsis actualizada con éxito!");
        setSelectedSynopsis(<p>{editedSynopsis}</p>); // Aquí se actualiza selectedSynopsis
        setIsEditing(false); // Se desactiva el modo de edición
    };


    const openReserve = (title) => {
        navigate(`/reservas?title=${title}`);

    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Libros disponibles</h1>
            {isAdmin && (
                <button className="bg-blue-500 text-white p-2 rounded mb-4" onClick={toggleAdminModal}>
                    Administrar Libros
                </button>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md w-1/2">
                        <h2 className="text-xl font-bold mb-4">Panel de Administración</h2>
                        <button className="block mb-4 bg-green-500 text-white p-2 rounded" onClick={openCreateBookForm}>
                            Crear Libro
                        </button>
                        <button className="block mb-4 bg-blue-500 text-white p-2 rounded" onClick={() => openEditBookForm()}>
                            Editar Libro
                        </button>
                        <button className="block mb-4 bg-red-500 text-white p-2 rounded" onClick={() => openDeleteBookForm(books)}>
                            Eliminar Libro
                        </button>
                        <button className="block bg-gray-500 text-white p-2 rounded" onClick={toggleAdminModal}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            <div className="ml-64">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <BookCard
                            key={book.isbn}
                            title={book.title}
                            author={book.author}
                            isbn={book.isbn}
                            published_year={book.published_year}
                            image={book.cover}
                            openSynopsis={() => openSynopsis(book.description)}
                            openReserve={() => openReserve(book.title)}
                        />
                    ))}
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md w-1/3">
                        {formType === "create" && (
                            <form onSubmit={handleSaveBook}>
                                <h3 className="text-xl font-bold mb-4">Crear Libro</h3>
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="text"
                                    placeholder="Título"
                                    value={bookDetails.title}
                                    onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="text"
                                    placeholder="Autor"
                                    value={bookDetails.author}
                                    onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="number"
                                    placeholder="ISBN"
                                    value={bookDetails.isbn}
                                    onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="text"
                                    placeholder="Categoría"
                                    value={bookDetails.category_id}
                                    onChange={(e) => setBookDetails({ ...bookDetails, category_id: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="text"
                                    placeholder="Año de publicación"
                                    value={bookDetails.published_year}
                                    onChange={(e) => setBookDetails({ ...bookDetails, published_year: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="text"
                                    placeholder="Sinopsis"
                                    value={bookDetails.description}
                                    onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="file"
                                    onChange={(e) => setBookDetails({ ...bookDetails, cover: e.target.files[0] })}
                                />
                                <button className="bg-green-500 text-white p-2 rounded" type="submit">
                                    Guardar Libro
                                </button>
                            </form>
                        )}

                        {showForm && formType === "edit" && !bookDetails.title && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded-md w-full max-w-md">
                                    <h3 className="text-xl font-bold mb-4 text-gray-800">Buscar Libro por ISBN</h3>
                                    <input
                                        className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        placeholder="Ingrese ISBN"
                                        value={bookDetails.isbn || ""}
                                        onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })}
                                    />
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                                            onClick={handleSearchBook}
                                        >
                                            Buscar
                                        </button>
                                        <button
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                                            onClick={() => setShowForm(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        {formType === "edit" && (

                            <form onSubmit={handleSaveBook}>
                                <h3 className="text-xl font-bold mb-4">Editar Libro</h3>
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="text"
                                    placeholder="Título"
                                    value={bookDetails.title}
                                    onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="text"
                                    placeholder="Autor"
                                    value={bookDetails.author}
                                    onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="text"
                                    placeholder="ISBN"
                                    value={bookDetails.isbn}
                                    onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="number"
                                    placeholder="Año de publicación"
                                    value={bookDetails.published_year}
                                    onChange={(e) => setBookDetails({ ...bookDetails, published_year: e.target.value })}
                                />
                                <input
                                    className="w-full border rounded p-2 mb-4"
                                    type="text"
                                    placeholder="Sinopsis"
                                    value={bookDetails.description}
                                    onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })}
                                />
                                <button className="bg-blue-500 text-white p-2 rounded" type="submit">
                                    Actualizar Libro
                                </button>
                            </form>
                        )}

                        {formType === "delete" && (
                            <div>
                                <h3 className="text-xl font-bold mb-4">Eliminar Libro</h3>
                                <p>Selecciona un libro de la lista para eliminarlo:</p>
                                <ul>
                                    {books.map((book) => (
                                        <li key={book.isbn} className="flex items-center justify-between mb-2">
                                            <span>{book.title} - {book.author}</span>
                                            <button
                                                className="bg-red-500 text-white p-2 rounded"
                                                onClick={() => handleDeleteBook(book.isbn)}
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button className="bg-gray-500 text-white p-2 rounded mt-4" onClick={() => setShowForm(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {selectedSynopsis && showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md w-1/2">
                        <h2 className="text-xl font-bold mb-4">Sinopsis</h2>
                        <div className="text-lg mb-4">
                            {isEditing ? (
                                <textarea
                                    className="w-full border rounded p-2"
                                    value={editedSynopsis}
                                    onChange={(e) => setEditedSynopsis(e.target.value)}
                                />
                            ) : (
                                selectedSynopsis
                            )}
                        </div>
                        <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={isEditing ? saveChanges : () => setIsEditing(true)}
                        >
                            {isEditing ? "Guardar" : "Editar"}
                        </button>
                        <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={closeModal}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookPage;