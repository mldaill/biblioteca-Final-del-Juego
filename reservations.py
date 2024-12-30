from typing import Annotated, Protocol, Union
from typing import List
from fastapi import APIRouter, Depends, Response, status
from pydantic import BaseModel
from books import Book, BookRepository, books, get_book_repository
from users import User, UserRepository, get_user_repository, users
from datetime import date
import psycopg
from psycopg.rows import class_row
from database import obtener_db


class ReservationIn(BaseModel):
    user_id: int
    isbn: int
    pickup_date: date
    return_date: date


class Reservation(BaseModel):
    id: int
    user_id: int
    isbn: int
    pickup_date: date
    return_date: date


class ReservationRepository(Protocol):

    def list(self) -> List[Reservation]: ...

    def create(self, reservation_in: ReservationIn) -> Reservation: ...

    def save(self, reservation: Reservation): ...

    def get(self, id: int) -> Union[Reservation, None]: ...

    def delete(self, id: int): ...


class RamReservationRepository(ReservationRepository):
    def __init__(self, reservations: List[Reservation]):
        self.reservations = reservations
        self.last_reservation_id = len(reservations)

    def list(self) -> List[Reservation]:
        return self.reservations

    def create(self, reservation_in: ReservationIn) -> Reservation:
        self.last_reservation_id += 1
        r = ReservationIn(
            id=self.last_reservation_id,
            isbn=reservation_in.isbn,
            user_id=reservation_in.user_id,
            pickup_date=reservation_in.pickup_date,
            return_date=reservation_in.return_date,
        )
        self.reservations.append(r)
        return r

    def save(self, reservation: Reservation):
        for r in self.reservations:
            if r.isbn == reservation.isbn:
                self.reservations.remove(r)
        self.reservations.append(reservation)

    def get(self, id: int) -> Reservation | None:
        for r in self.reservations:
            if r.id == id:
                return r
        return None

    def delete(self, id: int):
        for r in self.reservations:
            if r.id == id:
                self.reservations.remove(r)


class ReservationRepositoryPostgres(ReservationRepository):
    def __init__(self, conn: psycopg.Connection):
        self.conn = conn

    def list(self):
        with self.conn.cursor(row_factory=class_row(Reservation)) as cur:
            cur.execute(
                """
                SELECT id, pickup_date, return_date, user_id , isbn
                FROM reservations
                """
            )
            return cur.fetchall()

    def create(self, reservation_in: ReservationIn) -> Reservation:
        with self.conn.cursor(row_factory=class_row(Reservation)) as cur:
            query = """
                INSERT INTO reservations (user_id, isbn, pickup_date, return_date)
                VALUES (%s, %s, %s, %s)
                RETURNING id, user_id, isbn, pickup_date, return_date
                """
            cur.execute(
                query,
                (
                    reservation_in.user_id,
                    reservation_in.isbn,
                    reservation_in.pickup_date,
                    reservation_in.return_date,
                ),
            )
            self.conn.commit()
            return cur.fetchone()

    def get(self, id: int) -> Reservation | None:
        with self.conn.cursor(row_factory=class_row(Reservation)) as cur:
            query = """
                SELECT user_id, isbn, pickup_date, return_date FROM reservations WHERE id = %s
                """
            cur.execute(query, (id,))
            return cur.fetchone()

    def delete(self, id: int):
        with self.conn.cursor() as cur:
            query = """
            DELETE FROM reservations WHERE id = %s
            """
            cur.execute(query, (id,))
            self.conn.commit()


router = APIRouter()
repo = RamReservationRepository([])


def get_reservation_repository(
    conn: Annotated[psycopg.Connection, Depends(obtener_db)]
) -> ReservationRepository:
    return ReservationRepositoryPostgres(conn)

@router.post("/reservations")
def create_reservation(
    reservation_in: ReservationIn,
    repo: Annotated[ReservationRepository, Depends(get_reservation_repository)],
    user_repo: Annotated[UserRepository, Depends(get_user_repository)],
    book_repo: Annotated[BookRepository, Depends(get_book_repository)],
):
    user = user_repo.get(reservation_in.user_id)
    book = book_repo.get(reservation_in.isbn)
    if not user or not book:
        return Response(
            "El usuario o el libro no existe", status_code=status.HTTP_400_BAD_REQUEST
        )

    # Verificar conflicto de fechas
    for r in repo.list():
        if r.isbn == reservation_in.isbn:
            if not (
                reservation_in.return_date < r.pickup_date
                or reservation_in.pickup_date > r.return_date
            ):
                return Response(
                    "El libro ya se encuentra reservado en las fechas solicitadas",
                    status_code=status.HTTP_400_BAD_REQUEST,
                )

    return repo.create(reservation_in)


@router.get("/reservations")
def user_reservations(
    repo: Annotated[ReservationRepository, Depends(get_reservation_repository)],
    user_id: int = None,
):
    if user_id is None:
        return repo.list()
    return [r for r in repo.list() if r.user_id == user_id]


@router.delete("/reservations/{reservation_id}")
def delete_reservations(
    reservation_id: int,
    repo: Annotated[ReservationRepository, Depends(get_reservation_repository)],
):
    repo.delete(reservation_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/reservations/{reservation_id}")
def details_reservations(
    reservation_id: int,
    repo: Annotated[ReservationRepository, Depends(get_reservation_repository)],
):
    reservation = repo.get(reservation_id)
    if reservation is None:
        return Response("Reserva no encontrada", status_code=status.HTTP_404_NOT_FOUND)
    return reservation
