"""
Calculadora Simple
Enunciado: Pide dos números al usuario y muestra la
- suma
- resta
- multiplicación
- división.
"""
numero1 = float(input("Ingrese el numero1: "))
numero2 = float(input("Ingrese el numero2: "))

# f string, permite concatenar de forma mas sencilla
print(f"La suma es: {numero1 + numero2}")
print(f"La resta es: {numero1 - numero2}")
print(f"La multiplicacion es: {numero1 * numero2}")

if numero2 != 0.0:
  print(f"La division es: {numero1 / numero2}")
else:
  print("No se puede dividir entre 0")
