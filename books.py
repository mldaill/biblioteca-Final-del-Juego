from typing import Annotated, Protocol, Union
from fastapi import APIRouter, Depends
from pydantic import BaseModel


class Book(BaseModel):
    isbn: str
    title: str
    author: str
    published_year: int
    category_id: str


books = [
    Book(
        isbn="9788478887194",
        title="El Principito",
        author="Antoine de Saint-Exupéry",
        published_year=1943,
        category_id="Novela",
    ),
    Book(
        isbn="9781400000111",
        title="Álamos Talados",
        author="Julio Cortázar",
        published_year=1953,
        category_id="Novela",
    ),
    Book(
        isbn="9788497403201",
        title="Marianela",
        author="Benito Pérez Galdós",
        published_year=1878,
        category_id="Novela",
    ),
    Book(
        isbn="9788490709935",
        title="El Club de las 5 de la Mañana",
        author="Robin Sharma",
        published_year=2018,
        category_id="Autoayuda",
    ),
]


class BookRepository(Protocol):
    def list(self): ...

    def save(self, book: Book): ...

    def get(self, isbn: str) -> Book | None: ...

    def delete(self, isbn: str): ...


class RamBookRepository(BookRepository):
    def __init__(self, books: list[Book]):
        self.books = books

    def list(self) -> list[Book]:
        return self.books

    def save(self, book: Book):
        for b in self.books:
            if b.isbn == book.isbn:
                self.books.remove(b)
        self.books.append(book)

    def get(self, isbn: str) -> Book | None:
        for b in self.books:
            if b.isbn == isbn:
                return b
            return None

    def delete(self, isbn: str):
        for b in self.books:
            if b.isbn == isbn:
                self.books.remove(b)


router = APIRouter()
repo = RamBookRepository(books)


@router.get("/books")
def list_books(repo: Annotated[BookRepository, Depends(lambda: repo)]):
    return repo.list()


@router.put("/books")
def insert_book(book: Book, repo: Annotated[BookRepository, Depends(lambda: repo)]):
    repo.save(book)
    return "Libro creado"


@router.delete("/books/{isbn}")
def delete_book(isbn: str, repo: Annotated[BookRepository, Depends(lambda: repo)]):
    repo.delete(isbn)


@router.get("/books/{isbn}")
def get_book(isbn: str, repo: Annotated[BookRepository, Depends(lambda: repo)]):
    return repo.get(isbn)
