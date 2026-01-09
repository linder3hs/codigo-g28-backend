"""
Enunciado: Crea una función es_primo(numero) que determine si un número es primo.
"""

def es_primo(numero):
    if numero < 2:
        return f"El {numero}, no es primo"
    
    for i in range(2, numero):
        if numero % i == 0:
            return f"El {numero}, no es primo"
    
    return f"El {numero}, es primo"


print(es_primo(1))
print(es_primo(2))
print(es_primo(3))
print(es_primo(4))
print(es_primo(5))
print(es_primo(6))
print(es_primo(7))
print(es_primo(8))
print(es_primo(9))
print(es_primo(10))