"""
Enunciado: Crea una función contar_vocales(texto) que cuente las
vocales en un texto.

Hola mundo: 4
Python: 1
"""

def contar_vocales(texto):
    vocales = "aeiouAEIUO"
    contador = 0

    for letra in texto:
        print(letra)
        # si h esta en aeiouAEIUO
        # si o esta en aeiouAEIUO
        # si l esta en aeiouAEIUO
        # si a esta en aeiouAEIUO
        if letra in vocales:
            contador += 1
    print("-----------------")
    
    return contador


print(contar_vocales("hola mundo"))
print(contar_vocales("tecsup"))
print(contar_vocales("codigo"))
print(contar_vocales("backend"))