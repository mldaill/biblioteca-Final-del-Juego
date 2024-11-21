from typing import Annotated, Protocol, Union
from fastapi import APIRouter, Depends
from pydantic import BaseModel
import psycopg
from psycopg.rows import class_row
from database import obtener_db
from fastapi import HTTPException, Response, status


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


class BookRepositoryPostgres(BookRepository):
    def __init__(self, conn: psycopg.Connection):
        self.conn = conn

    def list(self):
        with self.conn.cursor(row_factory=class_row(Book)) as cur:
            cur.execute(
                """
                SELECT isbn, title, author, published_year, category_id FROM books
                """
            )
            return cur.fetchall()

    def save(self, book: Book):
        with self.conn.cursor() as cur:
            query = """
                INSERT INTO books (isbn, title, author, published_year, category_id)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (isbn)
                DO UPDATE SET title = EXCLUDED.title, author = EXCLUDED.author,
                published_year = EXCLUDED.published_year, category_id = EXCLUDED.category_id
                """
            cur.execute(
                query,
                (
                    book.isbn,
                    book.title,
                    book.author,
                    book.published_year,
                    book.category_id,
                ),
            )
            self.conn.commit()

    def get(self, isbn: str) -> Book | None:
        with self.conn.cursor(row_factory=class_row(Book)) as cur:
            query = """
            SELECT isbn, title, author, published_year, category_id FROM books WHERE isbn = %s
            """
            cur.execute(query, (isbn,))
            return cur.fetchone()

    def delete(self, isbn: str):
        with self.conn.cursor() as cur:
            query = """
            DELETE FROM books WHERE isbn = %s
            """
            cur.execute(query, (isbn,))
            self.conn.commit()


router = APIRouter()
repo = RamBookRepository(books)


def get_book_repository(
    conn: Annotated[psycopg.Connection, Depends(obtener_db)]
) -> BookRepository:
    return BookRepositoryPostgres(conn)


@router.get("/books")
def list_books(repo: Annotated[BookRepository, Depends(get_book_repository)]):
    return repo.list()


@router.put("/books")
def insert_book(
    book: Book,
    repo: Annotated[BookRepository, Depends(get_book_repository)],
):
    repo.save(book)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.delete("/books/{isbn}")
def delete_book(
    isbn: str, repo: Annotated[BookRepository, Depends(get_book_repository)]
):
    repo.delete(isbn)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/books/{isbn}")
def get_book(isbn: str, repo: Annotated[BookRepository, Depends(get_book_repository)]):
    book = repo.get(isbn)
    if not book:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    return book
