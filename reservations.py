from typing import Annotated, Protocol, Union
from typing import List
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from books import Book, books
from users import User, users
from datetime import date


class ReservationIn(BaseModel):
    user_id: int
    isbn: str
    pickup_date: date
    return_date: date
docker-compose.yml

class Reservation(BaseModel):
    id: int
    book: Book
    user: User
    pickup_date: date
    return_date: date


class ReservationRepository(Protocol):

    def list(self) -> List[Reservation]: ...

    def create(self, user: User, book: Book) -> Reservation: ...

    def save(self, reservation: Reservation): ...

    def get(self, id: int) -> Union[Reservation, None]: ...

    def delete(self, id: int): ...


class RamReservationRepository(ReservationRepository):
    def __init__(self, reservations: List[Reservation]):
        self.reservations = reservations
        self.last_reservation_id = len(reservations)

    def list(self) -> List[Reservation]:
        return self.reservations

    def create(self, user: User, book: Book) -> Reservation:
        self.last_reservation_id += 1
        r = Reservation(
            id=self.last_reservation_id,
            book=book,
            user=user,
            pickup_date=date.today(),
            return_date=date.today(),
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


router = APIRouter()
repo = RamReservationRepository([])


@router.post("/reservations")
def create_reservation(
    user_id: int,
    isbn: str,
    pickup_date: date,
    return_date: date,
    repo: Annotated[ReservationRepository, Depends(lambda: repo)],
):
    user = None
    book = None

    for u in users:
        if u.id == user_id:
            user = u
            break
    for b in books:
        if b.isbn == isbn:
            book = b
            break
    if user == None or book == None:
        return "El user o el book no existe"

    for r in repo.list():
        if r.book.isbn == isbn:
            if (
                r.pickup_date <= return_date
                and r.return_date >= pickup_date
                or r.return_date >= pickup_date
                and r.pickup_date <= return_date
            ):
                return "El libro ya se encuentra reservado"

    r = ReservationIn(
        book=book,
        user=user,
        pickup_date=pickup_date,
        return_date=return_date,
    )
    return repo.create(r)


@router.get("/reservations")
def user_reservations(user_id: int = None):
    if user_id == None:
        return repo.list()
    return [r for r in repo.list() if r.user.id == user_id]


@router.delete("/reservations/{reservation_id}")
def delete_reservations(reservation_id: int):
    for r in repo.list():
        if r.id == reservation_id:
            repo.list().remove(r)
            return "La reserva fue cancelada"
    return "Reserva no encontrada"


@router.get("/reservations/{reservation_id}")
def details_reservations(reservation_id: int):
    for r in repo.list():
        if r.id == reservation_id:
            return r
    return "Reserva no encontrada"
