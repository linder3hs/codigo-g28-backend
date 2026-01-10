"""
Encapsulamiento:

Python tenemos 3 niveles

Publico
- titular
- numero_de_cuenta
- banco
Protegido: Se usa solo dentro de la clase
- saldo
- email
- dni
Privada: 
- pin
"""

class CuentaBancaria:
    def __init__(self, titular: str, saldo: float, pin: int, email, dni):
        self.titular = titular
        # protegido: saldo, email, dni
        self._saldo = saldo
        self._email = email
        self._dni = dni
        # privado: pin
        self.__pin = pin
    
    def depositar(self, monto):
        if monto > 0:
            self._saldo += monto
    
    def retirar(self, pin, monto):
        if pin != self.__pin:
            print("Clave incorrecto")
            return
        
        if monto <= self._saldo:
            self._saldo -= monto
            print(f"Se retiro S/ {monto}")
        else:
            print("Saldo insuficiente")
    
    def ver_saldo(self):
        print(f"Tu saldo es: {self._saldo}")



cuenta_bancaria = CuentaBancaria("Linder Hassinger", 1000, 1234, "linder@gmail.com", "8888888")
cuenta_bancaria.depositar(1500)
cuenta_bancaria.ver_saldo()
cuenta_bancaria.retirar(1234, 2000)
cuenta_bancaria.ver_saldo()
# print(cuenta_bancaria.titular)
# Esto es tecnicamente posible, pero es una mala practica
# print(cuenta_bancaria._saldo)
# Esto es tecnicamente posible, pero es una mala practica
# print(cuenta_bancaria._CuentaBancaria__pin)