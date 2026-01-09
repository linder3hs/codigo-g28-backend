nombre = "Linder"
edad = int(input("Ingrese su edad: ")) # todo es un string (str)
# cuando una variable es conformada por mas de una palabra usamo "_"
es_mayor_edad = True | False
# esMayorEdad = True
saldo = float(input("Ingrese su saldo: "))

"""
pueden colocar un comentario super largo.
para ejecutar el archivo usamos el comando python init.py
"""

mensaje = ""

if edad >= 18:
  mensaje = "Es mayor de edad"
else:
  mensaje = "Es menor de edad"

print("---- Mensaje ----")
print(nombre)
print(edad, mensaje)
print(es_mayor_edad)
print(saldo)

# 0 - 9
for i in range(10):
  print(i)

# 5 - 10
for j in range(5, 11):
  print(j)

print("======= Arreglos =======")

frutas = ["manzana", "pera", "fresa", "pera"]
mixto = [1, 19.4, True, "hola", [1,2]]
print(frutas)
print(mixto[2])
print(frutas[-1]) # ultimo elemento del arreglo
print(frutas[-2])

frutas.append("uva")
frutas.insert(2, "kiwi")
frutas.insert(10, "arandanos")
frutas.remove("pera")
print(frutas)

print("======= Funciones =======")
def saludar():
    print("Hola mundo!!")

saludar()

def saludar_persona(nombre):
    print(f"Hola, {nombre}!!")

saludar_persona("Juan")

def sumar(n1, n2):
    return n1 + n2

print(sumar(1, 10))