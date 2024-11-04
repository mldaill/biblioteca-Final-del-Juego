from typing import Union
from fastapi import APIRouter
from pydantic import BaseModel


class UserIn(BaseModel):
    name: str
    email: str
    password: int
    is_admin: bool


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    is_admin: bool


class User(BaseModel):
    id: int
    name: str
    email: str
    password: int
    is_admin: bool


users: list[User] = [
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

last_id = 5


@router.get("/users")
def list_all_users():
    return users


@router.post("/users")
def create_new_user(user_in: UserIn):
    global last_id
    last_id = last_id + 1
    user = User(id=last_id, **user_in.model_dump())
    users.append(user)
    user_out = UserOut(**user.model_dump())
    return user_out


@router.delete("/users/{user_id}")
def delete_user(user_id: int):
    for u in users:
        if u.id == user_id:
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


@router.get("/users/{user_id}")
def search_user(user_id: int):
    for u in users:
        if u.id == user_id:
            return UserOut(**u.model_dump())
    return "Usuario no encontrado"
