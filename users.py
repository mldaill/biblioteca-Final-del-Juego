from typing import Union
from fastapi import APIRouter
from pydantic import BaseModel


class User(BaseModel):
    id: int
    name: str
    email: str
    password: int
    is_admin: bool


users = [
    User(
        id=1,
        name="Jose Ortiz",
        email="joseortiz@gmail.com",
        password=1234,
        is_admin=True,
    ),
    User(
        id=2,
        name="Pedro Perez",
        email="pedroperez@gmail.com",
        password=5678,
        is_admin=False,
    ),
    User(
        id=3,
        name="Juana Villafañe",
        email="jj@gmail.com",
        password=9236,
        is_admin=False,
    ),
    User(id=4, name="Ana García", email="ana@gmail.com", password=5896, is_admin=False),
    User(
        id=5, name="Sofía Sanchez", email="sofi@gmail.com", password=2589, is_admin=True
    ),
]

router = APIRouter()


@router.get("/users")
def all_users():
    return users


@router.post("/users")
def new_user(user: User):
    for u in users:
        if u.id == user.id:
            return "El usuario ya existe"
    users.append(user)
    return "Usuario creado con éxito"


@router.delete("/users/{id}")
def delete_user(id: int):
    for u in users:
        if u.id == id:
            users.remove(u)
            return "Usuario eliminado"
    return "Usuario no encontrado"


@router.put("/users")
def update_user(user: User):
    for u in users:
        if u.id == user.id:
            u.name = user.name
            u.email = user.email
            u.password = user.password
            u.is_admin = user.is_admin
            return "Usuario actualizado"
    return "Usuario no encontrado"


@router.get("/users/search")
def search_user(id: int):
    for u in users:
        if u.id == id:
            return u
    return "Usuario no encontrado"
