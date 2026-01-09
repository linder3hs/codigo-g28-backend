# 📚 Primera Clase de Python - Grupo G28

## 📝 Resumen de la Clase

Este repositorio contiene los ejercicios y conceptos fundamentales vistos en nuestra primera clase de Python. A continuación se detalla todo lo aprendido.

---

## 🎯 Conceptos Fundamentales

### 1. Variables y Tipos de Datos

En Python trabajamos con diferentes tipos de datos:

```python
nombre = "Linder"                    # String (str)
edad = 25                            # Integer (int)
saldo = 1500.50                      # Float (float)
es_mayor_edad = True                 # Boolean (bool)
```

**Convenciones de nomenclatura:**

- Cuando una variable tiene más de una palabra, usamos `snake_case`: `es_mayor_edad`
- Evitamos usar camelCase en Python (aunque es válido)

### 2. Entrada de Datos

Para recibir datos del usuario utilizamos `input()`:

```python
edad = int(input("Ingrese su edad: "))        # Convertir a entero
saldo = float(input("Ingrese su saldo: "))    # Convertir a decimal
nombre = input("Ingrese su nombre: ")         # Por defecto es string
```

⚠️ **Importante:** `input()` siempre retorna un string, por lo que debemos convertirlo al tipo de dato necesario.

### 3. Comentarios

```python
# Comentario de una línea

"""
Comentario de múltiples líneas
Útil para documentación extensa
"""
```

### 4. Estructuras Condicionales

```python
if edad >= 18:
    mensaje = "Es mayor de edad"
else:
    mensaje = "Es menor de edad"
```

**Operadores de comparación:**

- `>=` mayor o igual que
- `<=` menor o igual que
- `==` igual a
- `!=` diferente de
- `>` mayor que
- `<` menor que

### 5. Bucles (Loops)

#### Bucle `for` con `range()`

```python
# Del 0 al 9
for i in range(10):
    print(i)

# Del 5 al 10
for j in range(5, 11):
    print(j)

# Del 2 al 20, de 2 en 2
for k in range(2, 21, 2):
    print(k)
```

**Sintaxis de `range()`:**

- `range(n)` → del 0 a n-1
- `range(inicio, fin)` → del inicio a fin-1
- `range(inicio, fin, paso)` → del inicio a fin-1, con incrementos de "paso"

### 6. Listas (Arrays)

```python
frutas = ["manzana", "pera", "fresa", "pera"]
mixto = [1, 19.4, True, "hola", [1, 2]]
```

#### Acceso a elementos

```python
print(frutas[0])      # Primer elemento: "manzana"
print(frutas[2])      # Tercer elemento: "fresa"
print(frutas[-1])     # Último elemento
print(frutas[-2])     # Penúltimo elemento
```

#### Métodos de listas

```python
frutas.append("uva")              # Agregar al final
frutas.insert(2, "kiwi")          # Insertar en posición específica
frutas.remove("pera")             # Eliminar primera ocurrencia
len(frutas)                       # Obtener longitud de la lista
sum(notas)                        # Sumar todos los elementos (números)
max(numeros)                      # Obtener el valor máximo
min(numeros)                      # Obtener el valor mínimo
```

### 7. Funciones

```python
# Función sin parámetros
def saludar():
    print("Hola mundo!!")

# Función con parámetros
def saludar_persona(nombre):
    print(f"Hola, {nombre}!!")

# Función con retorno
def sumar(n1, n2):
    return n1 + n2
```

### 8. F-Strings (Formateo de Cadenas)

Los f-strings permiten concatenar variables de forma más sencilla:

```python
nombre = "Juan"
edad = 25
print(f"Hola, {nombre}!! Tienes {edad} años")
print(f"La suma es: {numero1 + numero2}")
```

### 9. Operadores Aritméticos

```python
suma = numero1 + numero2
resta = numero1 - numero2
multiplicacion = numero1 * numero2
division = numero1 / numero2
modulo = numero % 2              # Resto de la división
```

---

## 💻 Ejercicios Realizados

### Problema 1: Calculadora Simple

**Archivo:** `problema1.py`

Calculadora que pide dos números y muestra:

- Suma
- Resta
- Multiplicación
- División (con validación para evitar división entre 0)

**Conceptos aplicados:** Variables, input, operadores aritméticos, condicionales, f-strings

---

### Problema 2: Tabla de Multiplicar

**Archivo:** `problema2.py`

Programa que pide un número y muestra su tabla de multiplicar del 1 al 10.

**Conceptos aplicados:** Bucle for, range, f-strings

---

### Problema 3: Números Pares

**Archivo:** `problema3.py`

Imprime todos los números pares del 2 al 20 usando dos métodos:

1. Usando `range()` con paso de 2
2. Usando el operador módulo `%` para verificar si es par

**Conceptos aplicados:** Bucles, range con paso, operador módulo, condicionales

---

### Problema 4: Suma Acumulativa

**Archivo:** `problema4.py`

Calcula la suma de los números del 1 al 100.

**Conceptos aplicados:** Bucles, acumuladores, operador `+=`

---

### Problema 5: Lista de Nombres

**Archivo:** `problema5.py`

Crea una lista vacía, pide 5 nombres al usuario y los agrega a la lista. Al final muestra todos los nombres y la cantidad.

**Conceptos aplicados:** Listas, append, len, bucles

---

### Problema 6: Promedio de Notas

**Archivo:** `problema6.py`

Pide 6 notas al usuario, las guarda en una lista y calcula el promedio.

**Conceptos aplicados:** Listas, append, sum, len, división

---

### Problema 7: Mayor y Menor

**Archivo:** `problema7.py`

Crea una lista con 8 números ingresados por el usuario y encuentra el mayor y el menor.

**Conceptos aplicados:** Listas, funciones max y min

---

### Problema 8: Área de Rectángulo

**Archivo:** `problema8.py`

Crea una función `calcular_area(base, altura)` que calcula el área de un rectángulo.

**Fórmula:** `área = base × altura`

**Conceptos aplicados:** Funciones con parámetros, return, input

---

### Problema 9: Contador de Vocales

**Archivo:** `problema9.py`

Función `contar_vocales(texto)` que cuenta las vocales en un texto (mayúsculas y minúsculas).

**Conceptos aplicados:** Funciones, iteración sobre strings, operador `in`, contadores

---

### Problema 10: Número Primo

**Archivo:** `problema10.py`

Función `es_primo(numero)` que determina si un número es primo.

**Lógica:**

- Si el número es menor que 2, no es primo
- Se verifica si el número es divisible por algún número entre 2 y el número-1
- Si encuentra un divisor, no es primo

**Conceptos aplicados:** Funciones, bucles, condicionales, return, validaciones

---

## 🚀 Cómo Ejecutar los Archivos

Para ejecutar cualquier archivo Python, usa el siguiente comando en la terminal:

```bash
python nombre_archivo.py
```

Por ejemplo:

```bash
python init.py
python problema1.py
python problema10.py
```

---

## 📌 Notas Importantes

1. **Indentación:** Python usa indentación (espacios o tabs) para definir bloques de código. Es fundamental mantener una indentación consistente.

2. **Todo es un objeto:** En Python, todo es un objeto, incluyendo números, strings, listas, etc.

3. **Tipado dinámico:** No es necesario declarar el tipo de una variable, Python lo infiere automáticamente.

4. **Listas son mutables:** Podemos modificar, agregar o eliminar elementos de una lista después de crearla.

5. **Índices negativos:** Python permite usar índices negativos para acceder a elementos desde el final de una lista.

---

## 🎓 Conceptos Clave Aprendidos

✅ Variables y tipos de datos (int, float, str, bool)  
✅ Entrada y salida de datos (input, print)  
✅ Operadores aritméticos y de comparación  
✅ Estructuras condicionales (if-else)  
✅ Bucles (for con range)  
✅ Listas y sus métodos  
✅ Funciones (definición, parámetros, return)  
✅ F-strings para formateo de texto  
✅ Operador módulo (%)  
✅ Funciones integradas (len, sum, max, min)

---

## 📚 Recursos Adicionales

- [Documentación oficial de Python](https://docs.python.org/es/3/)
- [Tutorial de Python en español](https://docs.python.org/es/3/tutorial/)

---

**Fecha:** 8 de enero de 2026  
**Grupo:** G28 Backend  
**Instructor:** Linder
