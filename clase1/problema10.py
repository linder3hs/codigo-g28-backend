"""
Enunciado: Crea una función es_primo(numero) que determine si un número es primo.
"""

# 4
# 1 por defecto

# range(2,4) 2,3
# numero (4) % i (2) == 0

# 5
# 1 por defecto
# range(2,5) 2,3,4
# numero (5) % i (2) == 0 (1)
# numero (5) % i (3) == 0 (1)
# numero (5) % i (4) == 0 (1)


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