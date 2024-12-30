from typing import Annotated, Protocol, Union
from fastapi import APIRouter, Depends, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
import psycopg
from psycopg.rows import class_row
from database import obtener_db
from fastapi import HTTPException, Response, status
from fastapi import File, UploadFile

from pathlib import Path


STORAGE = Path("storage")


class Book(BaseModel):
    isbn: int
    title: str
    author: str
    published_year: int
    category_id: str
    description: str
    cover: str | None= None


books = [
    Book(
        isbn=9788478887194,
        title="El Principito",
        author="Antoine de Saint-Exupéry",
        published_year=1943,
        category_id="Novela",
        cover="/books/images/elPrincipito.png",
        description="El Principito narra la historia de un niño príncipe que vive en un pequeño asteroide y que cae a la Tierra, donde conoce a un piloto varado en el desierto. Ambos entablan una conversación en clave poética donde hablan de filosofía, de crítica social, del amor, del honor y de mucho de lo que nos hace humanos.",
    ),
    Book(
        isbn=9781400000111,
        title="Álamos Talados",
        author="Abelardo Arias",
        published_year=1953,
        category_id="Novela",
        cover="/books/images/alamosTalados.png",
        description="Álamos Talados cuenta un idealizado amor juvenil en unas vacaciones mendocinas.",
    ),
    Book(
        isbn=9788497403201,
        title="Marianela",
        author="Benito Pérez Galdós",
        published_year=1878,
        category_id="Novela",
        cover="/books/images/Marianela.png",
        description="Marianela nos cuenta la trágica vida de la joven Nela, huérfana de quince años, pobre, fea y deforme, enamorada de Pablo, de familia adinerada, hermoso joven de diecinueve años, dotado de todas las perfecciones posibles, pero ciego. Convencido de que todo lo bueno debe ser hermoso, Pablo declara su amor a Marianela. Pero la llegada al pueblo de un oftalmólogo dispuesto a operar a Pablo para devolverle la vista arroja malos presagios sobre la relación entre ambos jóvenes.",
    ),
    Book(
        isbn=9788490709935,
        title="El Club de las 5 de la Mañana",
        author="Robin Sharma",
        published_year=2018,
        category_id="Autoayuda",
        cover="/books/images/elClub.png",
        description="El Club de las 5 de la mañana es la innovadora e increíble historia de dos personas que desean mejorar la productividad, la prosperidad y la serenidad en esta época de distracciones digitales y de abrumadora complejidad, y conocen a un magnate extraño pero fantástico.",
    ),
]


class BookRepository(Protocol):
    def list(self): ...

    def save(self, book: Book): ...

    def get(self, isbn: int) -> Book | None: ...

    def delete(self, isbn: int): ...


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

    def get(self, isbn: int) -> Book | None:
        for b in self.books:
            if b.isbn == isbn:
                return b
        return None

    def delete(self, isbn: int):
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
                SELECT isbn, title, author, published_year,category_id,cover,description FROM books
                """
            )
            return cur.fetchall()

    def save(self, book: Book):
        with self.conn.cursor() as cur:
            query = """
                INSERT INTO books (isbn, title, author, published_year,category_id,cover,description)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (isbn)
                DO UPDATE SET title = EXCLUDED.title, author = EXCLUDED.author,
                published_year = EXCLUDED.published_year,category_id = EXCLUDED.category_id, cover = EXCLUDED.cover, description = EXCLUDED.description
                """
            cur.execute(
                query,
                (
                    book.isbn,
                    book.title,
                    book.author,
                    book.published_year,
                    book.category_id,
                    book.cover,
                    book.description,
                ),
            )
            self.conn.commit()

    def get(self, isbn: int) -> Book | None:
        with self.conn.cursor(row_factory=class_row(Book)) as cur:
            query = """
            SELECT isbn, title, author, published_year,category_id,cover,description FROM books WHERE isbn = %s
            """
            cur.execute(query, (isbn,))
            return cur.fetchone()

    def delete(self, isbn: int):
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


@router.post("/books", status_code=status.HTTP_201_CREATED)
async def create_book(
    repo: Annotated[BookRepository, Depends(get_book_repository)],
    book: Book= Depends(),
    cover: UploadFile = File(...),
):
    

    existing_book = repo.get(book.isbn)
    if existing_book:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="El libro ya existe"
        )

    cover_folder = STORAGE / "books" / "images"
    cover_folder.mkdir(parents=True, exist_ok=True)

    cover_filename = f"{book.isbn}_{cover.filename}"
    cover_path = cover_folder / cover_filename
    with open(cover_path, "wb") as f:
        f.write(await cover.read())

    book.cover = f"/books/images/{cover_filename}"

    repo.save(book)
    return {"message": "Libro creado exitosamente"}


@router.patch("/books")
def edit_book(
    book: Book,
    repo: Annotated[BookRepository, Depends(get_book_repository)],
):
    repo.save(book)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.delete("/books/{isbn}")
def delete_book(
    isbn: int, repo: Annotated[BookRepository, Depends(get_book_repository)]
):
    repo.delete(isbn)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/books/{isbn}")
def get_book(isbn: int, repo: Annotated[BookRepository, Depends(get_book_repository)]):
    book = repo.get(isbn)
    if not book:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    return book


@router.get("/books/images/{file}")
def get_book_image(file: str):
    return FileResponse(STORAGE /"books/images"/ file)
