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
