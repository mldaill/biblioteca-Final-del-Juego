from fastapi import FastAPI
from database import conectar_db, cerrar_db
from contextlib import asynccontextmanager

import users
import books
import reservations


@asynccontextmanager
async def lifespan(app: FastAPI):
    conectar_db()
    yield
    cerrar_db()


app = FastAPI(lifespan=lifespan)


app.include_router(users.router, tags=["users"])
app.include_router(books.router, tags=["books"])
app.include_router(reservations.router, tags=["reservations"])
