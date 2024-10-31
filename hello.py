from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel 


class Tarea(BaseModel):
   titulo: str
       

app = FastAPI()



@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}




@app.post("/usuarios")
def read_item(nombre: str):
    return {"nombre": nombre}

@app.get("/libros/{libro_id}")
def obtener_libro(libro_id: int):
    libros  = ["El principito", "Cien años de Soledad", "Don Quijote"]
    if libro_id < len(libros):
        return libros[libro_id]
    return {"error": "Libro no encontrado"}


tareas = [Tarea(titulo="cocinar"), Tarea(titulo="lavar"), Tarea(titulo="planchar")]


@app.get("/tareas")
def tareas_pendientes():
     return tareas

@app.post("/tarea_nueva")
def nueva_tarea(tarea : Tarea):
    if tarea in tareas: 
        return "La tarea ya existe"
    else:
        tareas.append(tarea)
    return "Tarea creada"

@app.delete("/eliminar_tarea")    
def tarea_seleccionada(tarea : Tarea):
    if tarea in tareas :
        tareas.remove(tarea)
        return "Tarea eliminada"
    else:
        return "Tarea inexistente"

