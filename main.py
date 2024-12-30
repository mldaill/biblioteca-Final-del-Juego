from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

app.add_middleware (
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,  # Permite enviar cookies en la solicitud (si es necesario)
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

app.include_router(users.router, tags=["users"])
app.include_router(books.router, tags=["books"])
app.include_router(reservations.router, tags=["reservations"])