nombre = "Linder"
edad = int(input("Ingrese su edad: ")) # todo es un string (str)
# cuando una variable es conformada por mas de una palabra usamo "_"
es_mayor_edad = True | False
# esMayorEdad = True
saldo = 10.57

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
