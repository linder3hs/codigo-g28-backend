"""
Enunciado: Crea una función calcular_area(base, altura), deben ser ingresados por el usuario
que calcule el área de un rectángulo.

Formula: base * altura
"""

def calcular_area(base, altura):
    return base * altura

base = float(input("Ingrese la base: "))
altura = float(input("Ingrese la altura: "))

print(calcular_area(base, altura))