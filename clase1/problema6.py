"""
Enunciado: Pide 6 notas al usuario, guárdalas en una lista y calcula el promedio.
"""

notas = []

for i in range(6):
    nota = float(input(f"Ingrese la nota {i + 1} : "))
    notas.append(nota)

# promedio
promedio = sum(notas) / len(notas)

print(f"El promedio final es: {promedio}")