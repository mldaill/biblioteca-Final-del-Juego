from typing import Annotated, Protocol, Union
from fastapi import APIRouter, Depends
from pydantic import BaseModel
import psycopg
from psycopg.rows import class_row
from database import obtener_db


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


class UserRepository(Protocol):
    def list(self): ...

    def create(self, user: UserIn) -> User: ...

    def save(self, user: User): ...

    def get(self, id: int) -> User | None: ...

    def delete(self, id: int): ...


class RamUserRepository(UserRepository):
    def __init__(self, users: list[User]):
        self.users = users
        self.last_user_id = max(user.id for user in users) if users else 0

    def list(self) -> list[User]:
        return self.users

    def create(self, user_in: UserIn) -> User:
        new_id = self.last_user_id + 1
        self.last_user_id = new_id

        new_user = User(
            id=new_id,
            name=user_in.name,
            email=user_in.email,
            password=user_in.password,
            is_admin=user_in.is_admin,
        )

        self.users.append(new_user)

        return UserOut(
            id=new_user.id,
            name=new_user.name,
            email=new_user.email,
            is_admin=new_user.is_admin,
        )

    def save(self, user: User):
        for u in self.users:
            if u.id == user.id:
                self.users.remove(u)
        self.users.append(user)

    def get(self, id: int) -> User | None:
        for u in self.users:
            if u.id == id:
                return u
            return None

    def delete(self, id: int):
        for u in self.users:
            if u.id == id:
                self.users.remove(u)


class UserRepositoryPostgres(UserRepository):
    def __init__(self, conn: psycopg.Connection):
        self.conn = conn

    def list(self):
        with self.conn.cursor(row_factory=class_row(User)) as cur:
            cur.execute(
                """
                SELECT id, name, email, password, is_admin FROM users ORDER BY id
                """
            )
            return cur.fetchall()

    def create(self, user: UserIn) -> User:
        with self.conn.cursor(row_factory=class_row(User)) as cur:
            cur.execute(
                """
                INSERT INTO users(name, email, password, is_admin)
                VALUES (%s, %s, %s, %s)
                RETURNING id, name, email, password, is_admin
                """,
                (user.name, user.email, user.password, user.is_admin),
            )
            self.conn.commit()
            new_user = cur.fetchone()
            print(new_user)
            return new_user

    def save(self, user: User):
        with self.conn.cursor() as cur:
            cur.execute (
                """
                UPDATE users
                SET name = %s, email = %s, password = %s, is_admin = %s
                WHERE id = %s
                """,
                (user.name, user.email, user.password, user.is_admin, user.id),
            ) 
            self.conn.commit()

    def get(self, id: int) -> User | None:
        with self.conn.cursor(row_factory=class_row(User)) as cur:
            query = """
               SELECT id, name, email, password, is_admin FROM users WHERE id=%s  
               """
            cur.execute(query, (id,))
            return cur.fetchone()

    def delete(self, id: int):
        with self.conn.cursor() as cur:
            query = """
            DELETE FROM users WHERE id = %s
            """
            cur.execute(query, (id,))
            self.conn.commit()


router = APIRouter()
repo = RamUserRepository(users)


def get_user_repository(
    conn: Annotated[psycopg.Connection, Depends(obtener_db)]
) -> UserRepository:
    return UserRepositoryPostgres(conn)


@router.get("/users")
def list_users(repo: Annotated[UserRepository, Depends(get_user_repository)]):
    return repo.list()


@router.post("/users")
def create_new_user(
    user_in: UserIn, repo: Annotated[UserRepository, Depends(get_user_repository)]
):
    return repo.create(user_in)


@router.delete("/users/{user_id}")
def delete_user(user_id: int, repo: Annotated[UserRepository, Depends(get_user_repository)]):
    return repo.delete(user_id)


@router.put("/users")
def update_user(user: User, repo: Annotated[UserRepository, Depends(get_user_repository)]):
    return repo.save(user)


@router.get("/users/{user_id}")
def get_user(user_id: int, repo: Annotated[UserRepository, Depends(get_user_repository)]):
    return repo.get(user_id)
