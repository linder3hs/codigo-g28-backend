"""
super()
"""

class Vehiculo:
    def __init__(self, marca, modelo, anio):
        self.marca = marca
        self.modelo = modelo
        self.anio = anio
        self.encendido = False
    
    def encender(self):
        self.encender = True
        print("El vehiculo encendio")

    def apagar(self):
        self.encender = False
        print("El vehiculo se apago")

    def mostrar_informacion(self):
        return f"La marca es: {self.marca}\nModelo: {self.modelo}\nAño: {self.anio}"


class Auto(Vehiculo):
    def __init__(self, marca, modelo, anio, cilindrida, color):
        super().__init__(marca, modelo, anio)
        self.cilindrada = cilindrida
        self.color = color
    
    def limpiar_parabrisas(self):
        print("Activar limpia parabrisas")

    def mostrar_informacion(self):
        message = super().mostrar_informacion()
        print(f"{message}\nCilindrada: {self.cilindrada}\nColor: {self.color}")


auto1 = Auto("Nissan", "Versa", 2023, 12, "Azul")
auto1.mostrar_informacion()