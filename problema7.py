"""
Enunciado: Crea una lista con 8 números ingresados por el usuario
y encuentra el mayor y el menor.
"""

numeros = []

for i in range(8):
    numero = int(input("ingrese el numero: "))
    numeros.append(numero)

# min max
print(f"El numero mayor es: {max(numeros)}")
print(f"El numero menor es: {min(numeros)}")