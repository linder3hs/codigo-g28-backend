"""
Enunciado: Imprime todos los números pares del 2 al 20.
"""
for i in range(2, 21, 2):
  print(i)

print("="*30)

for j in range(1, 21):
  if j % 2 == 0:
    print(j)
