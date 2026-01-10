# Clase Padre
class Animal:
    def __init__(self, nombre, edad, peso):
        self.nombre = nombre
        self.edad = edad
        self.peso = peso
    
    def comer(self):
        print(f"El animal {self.nombre}, esta comiendo")
    
    def dormir(self):
        print(f"El animal {self.nombre}, esta durmiendo")

    def mostrar_peso(self):
        print(f"El animas {self.nombre}, pesa {self.peso}Kg")


class Perro(Animal):
    def ladrar(self):
        print("Gua Gua")
    

class Gato(Animal):
    def rasgar(self):
        print("Rasgando un mueble")


perro1 = Perro("Oso", 10, 14)
perro1.comer()
perro1.ladrar()
perro1.mostrar_peso()

gato1 = Gato("Michi", 4, 7)
gato1.comer()
gato1.rasgar()
gato1.mostrar_peso()
