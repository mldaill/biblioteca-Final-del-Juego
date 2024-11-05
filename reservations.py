from typing import Union
from typing import List
from fastapi import APIRouter
from pydantic import BaseModel
from books import Book, books
from users import User, users
from datetime import date

router = APIRouter()


class Reservation(BaseModel):
    id: int
    book: Book
    user: User
    pickup_date: date
    return_date: date


reservations: List[Reservation] = []

last_reservation_id = 0


@router.post("/reservations")
def create_reservation(
    user_id: int, book_id: int, pickup_date: date, return_date: date
):
    user = None
    book = None

    for u in users:
        if u.id == user_id:
            user = u
            break
    for b in books:
        if b.id == book_id:
            book = b
            break
    if user == None or book == None:
        return " El user o el book no existe"

    for r in reservations:
        if r.book.id == book_id:
            if (
                r.pickup_date <= return_date
                and r.return_date >= pickup_date
                or r.return_date >= pickup_date
                and r.pickup_date <= return_date
            ):
                return " El libro ya se encuentra reservado"

    global last_reservation_id
    last_reservation_id = last_reservation_id + 1
    r = Reservation(
        id=last_reservation_id,
        book=book,
        user=user,
        pickup_date=pickup_date,
        return_date=return_date,
    )
    reservations.append(r)
    return r


@router.get("/reservations")
def user_reservations(user_id: int = None):
    if user_id == None:
        return reservations
    ret = []
    for r in reservations:
        if r.user.id == user_id:
            ret.append(r)
    return ret


@router.delete("/reservations/{reservation_id}")
def delete_reservations(reservation_id: int):
    for r in reservations:
        if r.id == reservation_id:
            reservations.remove(r)
            return "La reserva fue cancelada"


@router.get("/reservations/{reservations_id}")
def details_reservations(reservation_id: int):
    for r in reservations:
        if r.id == reservation_id:
            return r
