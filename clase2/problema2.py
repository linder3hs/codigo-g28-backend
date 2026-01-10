"""
Ejercicio: Figuras Geométricas
Enunciado:
Crea una clase padre Figura y dos clases hijas Cuadrado y Circulo que hereden de Figura.

Clase Figura debe tener:
Atributo: color
Método: pintar()

Clase Cuadrado debe:
Heredar de Figura
Atributo adicional: lado
Método propio: calcular_area()

Clase Circulo debe:
Heredar de Figura
Atributo adicional: radio
Método propio: calcular_area()
"""
import math

class Figura:
    def __init__(self, color):
        self.color = color

    def pintar(self):
        print(f"La figura se pinto de color {self.color}")


class Cuadrado(Figura):
    def __init__(self, color, lado):
        super().__init__(color)
        self.lado = lado
    
    def calcular_area(self):
        print(f"El area del cuadrado es: {math.pow(self.lado, 2)}")


class Circulo(Figura):
    def __init__(self, color, radio):
        super().__init__(color)
        self.radio = radio

    def calcular_area(self):
        print(f"El area del circulo es: {math.pi * math.pow(self.radio, 2)}")


cuadrado1 = Cuadrado("Azul", 5)
cuadrado1.pintar()
cuadrado1.calcular_area()

circulo1 = Circulo("Rojo", 34.3)
circulo1.pintar()
circulo1.calcular_area()