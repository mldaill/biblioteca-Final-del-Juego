""" """ """ mi_lista = [1, "pedro", 2, 5, 2, 2]

print(mi_lista[1])

mi_lista[2] = 100
print(mi_lista[2])

print(mi_lista)

mi_lista.append(15)
print(mi_lista)

mi_lista.insert(3, "miguel")
print(mi_lista)

mi_lista.remove(2)
print(mi_lista)

mi_lista.pop(1)
print(mi_lista)

mi_lista.pop()
print(mi_lista)

print(len(mi_lista))

for elemento in mi_lista:
    print(elemento) """



""" def saludo(nombre, apellido):
  return nombre + " " + apellido 
print(saludo("juan","perez")) """



""" libro = {

    "titulo": "El principito",
    "editorial": "Monaco",
    "cantidad de páginas": 100
}

for elementos in libro:            
    print(f"{elementos}: {libro[elementos]}") """

""" print(libro["titulo"])

libro["cantidad de páginas"] = 105
print(libro)

del libro["titulo"]
print(libro)

precios_frutas = {
    "manzana": 1.2,
    "banana": 0.5,
    "naranja": 0.8
    } """




    
    
    
    
    
    

"""contador = 1
while contador <= 10:
    if contador == 6:
        break
    print(contador)
    contador += 1  

    open(prueba.txt)"""

class Termo:
    def __init__(self, marca, capacidad_maxima ):
        self.marca = marca
        self.capacidad_maxima = capacidad_maxima
        self.litros_almacenados = 0
    
    def llenar(self, cantidad_litros ):
        capacidad_restante = self.capacidad_maxima - self.litros_almacenados
        if cantidad_litros > capacidad_restante:
            print("capacidad supera el maximo")
            return
        self.litros_almacenados = cantidad_litros + self.litros_almacenados
        print( f"llené {self.litros_almacenados} litros del termo")
    
    
  
termo1 = Termo("atom", 2)

termo1.llenar(1.5)
termo1.llenar(0.5)
termo1.llenar(1)

class Persona:
    def __init__(self,nombre, edad):
        self.nombre = nombre
        self.edad = edad
    def __str__(self):
        return f"persona: {self.nombre} de {self.edad} años" 
 
    
 
Persona1 = Persona("Marianela", 35)
print(repr(Persona1)) 


class GrupoPersonas:
    def __init__(self, personas):
        self.personas = personas 
    
    def __len__(self):
        return len(self.personas)

Grupo1 = GrupoPersonas(["Marianela", "Diego","Sofia", "Luis"])
print(len(Grupo1))