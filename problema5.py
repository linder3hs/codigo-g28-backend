"""
Enunciado: Crea una lista vacía, pide 5 nombres 
al usuario y agrégalos a la lista. Al final muestra todos.
"""
usuarios = []

for i in range(5):
    nombre = input(f"Ingrese el nombre del usuario {i + 1}: ")
    usuarios.append(nombre)


print(len(usuarios))
print(usuarios)