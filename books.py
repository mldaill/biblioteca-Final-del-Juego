from typing import Union
from fastapi import APIRouter
from pydantic import BaseModel


class Book(BaseModel):
    id: int
    title: str
    author: str
    published_year: int
    category_id: str


books = [
    Book(
        id=1,
        title="El Principito",
        author="Antoine de Saint-Exupéry",
        published_year=1943,
        category_id="Novela",
    ),
    Book(
        id=2,
        title="Álamos Talados",
        author="Julio Cortázar",
        published_year=1953,
        category_id="Novela",
    ),
    Book(
        id=3,
        title="Marianela",
        author="Benito Pérez Galdós",
        published_year=1878,
        category_id="Novela",
    ),
    Book(
        id=4,
        title="El Club de las 5 de la Mañana",
        author="Robin Sharma",
        published_year=2018,
        category_id="Autoayuda",
    ),
]


router = APIRouter()


@router.get("/books")
def all_books():
    return books


@router.post("/books")
def new_book(book: Book):
    for b in books:
        if b.title == book.title:
            return "El libro ya existe"
    books.append(book)
    return "Libro creado"


@router.delete("/books/{title}")
def delete_book(title: str):
    for t in books:
        if t.title == title:
            books.remove(t)
            return "Libro eliminado"
    return "Libro no encontrado"


@router.put("/books")
def update_book(book: Book):
    for b in books:
        if b.title == book.title:
            b.id = book.id
            b.author = book.author
            b.published_year = book.published_year
            b.category_id = book.category_id
            return "Libro actualizado"
    return "Libro no encontrado"


@router.get("/books/search")
def search_book(title: str):
    for t in books:
        if t.title == title:
            return t
    return "Libro no encontrado"
