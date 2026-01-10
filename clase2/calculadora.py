class Calculadora:
    def __init__(self):
        self.resultado = 0
        self.historial = []
    
    def sumar(self, n1, n2):
        self.resultado = n1 + n2
        self.historial.append(f"La suma es: {self.resultado}")

    def restar(self, n1, n2):
        self.resultado = n1 - n2
        self.historial.append(f"La resta es: {self.resultado}")

    def multiplicar(self, n1, n2):
        self.resultado = n1 * n2
        self.historial.append(f"La multiplicacion es: {self.resultado}")
    
    def division(self, n1, n2):
        if n2 != 0:
            self.resultado = n1 / n2
            self.historial.append(f"La división es: {self.resultado}")
        else:
            self.historial.append(f"La división de {n1} / {n2}, no es posible")
    
    def imprimir(self):
        for i in self.historial:
            print(i)
        
    
calcular1 = Calculadora()
calcular1.sumar(10, 20)
calcular1.restar(30, 12)
calcular1.multiplicar(100, 21)
calcular1.division(50, 5)
calcular1.imprimir()