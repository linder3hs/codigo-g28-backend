"""
Ejercicio: Mascota Virtual
Enunciado:
Crea una clase Mascota que tenga:

Atributos: nombre, tipo (perro, gato, etc.), hambre (0-10), felicidad (0-10)
Métodos: alimentar(), jugar(), mostrar_informacion()
"""

class Mascota:
    def __init__(self, nombre, tipo, hambre = 0, felicidad = 0):
        self.nombre = nombre
        self.tipo = tipo
        self.hambre = hambre
        self.felicidad = felicidad

    def alimentar(self):
        if self.hambre == 0:
            print("La mascota esta llena")
            return
        
        if self.hambre > 0:
            self.hambre -= 1
            print("Se alimento a la mascota")

    def jugar(self):
        if self.felicidad == 10:
            print("La mascota ya esta feliz")
            return
        
        self.felicidad += 1

    def mostrar_informacion(self):
        print("======= INFORMACION ============")
        print(f"| Nombre    | {self.nombre}    |")
        print(f"| Tipo      |{self.tipo}       |")
        print(f"| Hambre    | {self.hambre}    |")
        print(f"| Felicidad | {self.felicidad} |")


mascota1 = Mascota("Firualis", "Perro", 5, 5)
mascota1.alimentar()
mascota1.alimentar()
mascota1.jugar()
mascota1.jugar()
mascota1.mostrar_informacion()