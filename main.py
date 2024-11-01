from fastapi import FastAPI

import users
import books
import reservations


app = FastAPI()


app.include_router(users.router, tags=["users"])
app.include_router(books.router, tags=["books"])
app.include_router(reservations.router, tags=["reservations"])
