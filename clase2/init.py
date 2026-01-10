"""
Clase: Plantilla o Molde de algo de la vida real a codigo

Objeto: es cuando usamos la clase (instanciar)
"""

# Clase Auto
class Auto:
    # atributos
    ruedas = 4
    numero_puertas = 5

    # constructor: son los parametros que recibe la clase
    def __init__(self, marca, modelo, hp):
        self.marca = marca
        self.modelo = modelo
        self.hp = hp
        self.color = "rojo"


    def describir_auto(self):
        print(f"El auto tiene la siguientes caracteristicas:\nMarca: {self.marca}\nModelo: {self.modelo}\nHP: {self.hp}\nColor: {self.color}")


"""
Cuando usamos la clase en el codigo a esto se le llama
INSTANCIAR, recuerden que se puede instanciar una clase n 
veces
"""
auto1 = Auto("Jepp", "Compass", 165)
print(auto1.modelo, auto1.ruedas)
auto1.describir_auto()
auto2 = Auto("Nissan", "Kicks", 120)
auto2.describir_auto()
auto3 = Auto("Toyota", "Rav 4", 185)
auto3.describir_auto()


