# 📚 Curso de Python Backend - Grupo G28

## 📖 Descripción del Repositorio

Este repositorio contiene todo el material desarrollado en el curso de Python Backend del Grupo G28. Cada carpeta representa una clase con sus respectivos ejercicios, conceptos y prácticas.

---

## 📂 Estructura del Proyecto

```
codigo-g28-backend/
├── clase1/          # Fundamentos de Python
├── clase2/          # Programación Orientada a Objetos (POO)
└── README.md
```

---

# 📘 Clase 1: Fundamentos de Python

**Carpeta:** `clase1/`  
**Fecha:** 8 de enero de 2026

## 🎯 Temas Desarrollados

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

### 3. Estructuras Condicionales

```python
if edad >= 18:
    mensaje = "Es mayor de edad"
else:
    mensaje = "Es menor de edad"
```

**Operadores de comparación:** `>=`, `<=`, `==`, `!=`, `>`, `<`

### 4. Bucles (Loops)

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

### 5. Listas (Arrays)

```python
frutas = ["manzana", "pera", "fresa", "pera"]
mixto = [1, 19.4, True, "hola", [1, 2]]

# Acceso a elementos
print(frutas[0])      # Primer elemento
print(frutas[-1])     # Último elemento

# Métodos de listas
frutas.append("uva")              # Agregar al final
frutas.insert(2, "kiwi")          # Insertar en posición específica
frutas.remove("pera")             # Eliminar primera ocurrencia
len(frutas)                       # Obtener longitud
sum(notas)                        # Sumar elementos
max(numeros)                      # Valor máximo
min(numeros)                      # Valor mínimo
```

### 6. Funciones

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

### 7. F-Strings (Formateo de Cadenas)

```python
nombre = "Juan"
edad = 25
print(f"Hola, {nombre}!! Tienes {edad} años")
```

## 💻 Ejercicios Realizados - Clase 1

| Archivo         | Descripción                                                | Conceptos                                                  |
| --------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `init.py`       | Archivo de demostración con todos los conceptos básicos    | Variables, input, condicionales, bucles, listas, funciones |
| `problema1.py`  | Calculadora simple (suma, resta, multiplicación, división) | Variables, input, operadores aritméticos, condicionales    |
| `problema2.py`  | Tabla de multiplicar                                       | Bucle for, range, f-strings                                |
| `problema3.py`  | Números pares del 2 al 20                                  | Bucles, range con paso, operador módulo                    |
| `problema4.py`  | Suma de números del 1 al 100                               | Bucles, acumuladores, operador `+=`                        |
| `problema5.py`  | Lista de 5 nombres ingresados por el usuario               | Listas, append, len, bucles                                |
| `problema6.py`  | Promedio de 6 notas                                        | Listas, append, sum, len                                   |
| `problema7.py`  | Mayor y menor de 8 números                                 | Listas, funciones max y min                                |
| `problema8.py`  | Área de un rectángulo                                      | Funciones con parámetros, return                           |
| `problema9.py`  | Contador de vocales en un texto                            | Funciones, iteración sobre strings, operador `in`          |
| `problema10.py` | Verificar si un número es primo                            | Funciones, bucles, condicionales, validaciones             |

## 🎓 Conceptos Clave - Clase 1

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

# 📗 Clase 2: Programación Orientada a Objetos (POO)

**Carpeta:** `clase2/`  
**Fecha:** 9 de enero de 2026

## 🎯 Temas Desarrollados

### 1. Clases y Objetos

**Concepto:** Una clase es una plantilla o molde que representa algo de la vida real en código. Un objeto es cuando usamos esa clase (instanciar).

```python
class Auto:
    # Atributos de clase
    ruedas = 4
    numero_puertas = 5

    # Constructor: parámetros que recibe la clase
    def __init__(self, marca, modelo, hp):
        self.marca = marca
        self.modelo = modelo
        self.hp = hp
        self.color = "rojo"

    # Método
    def describir_auto(self):
        print(f"Marca: {self.marca}, Modelo: {self.modelo}, HP: {self.hp}")

# Instanciar la clase (crear objetos)
auto1 = Auto("Jepp", "Compass", 165)
auto2 = Auto("Nissan", "Kicks", 120)
```

**Conceptos clave:**

- **Clase:** Plantilla o molde
- **Objeto:** Instancia de una clase
- **Atributos:** Características de la clase
- **Métodos:** Funciones dentro de una clase
- **Constructor (`__init__`):** Método especial que se ejecuta al crear un objeto

### 2. Encapsulamiento

Python tiene 3 niveles de acceso a atributos:

```python
class CuentaBancaria:
    def __init__(self, titular, saldo, pin, email, dni):
        # Público
        self.titular = titular

        # Protegido (se usa solo dentro de la clase)
        self._saldo = saldo
        self._email = email
        self._dni = dni

        # Privado (no se puede acceder desde fuera)
        self.__pin = pin
```

**Niveles de encapsulamiento:**

- **Público:** `self.atributo` - Accesible desde cualquier lugar
- **Protegido:** `self._atributo` - Convención para uso interno (técnicamente accesible)
- **Privado:** `self.__atributo` - No accesible directamente desde fuera de la clase

**Ejemplo práctico:**

```python
cuenta = CuentaBancaria("Linder", 1000, 1234, "linder@gmail.com", "8888888")
cuenta.depositar(1500)
cuenta.retirar(1234, 2000)
cuenta.ver_saldo()
```

### 3. Herencia

La herencia permite crear clases que heredan atributos y métodos de otras clases.

```python
# Clase Padre
class Animal:
    def __init__(self, nombre, edad, peso):
        self.nombre = nombre
        self.edad = edad
        self.peso = peso

    def comer(self):
        print(f"El animal {self.nombre}, esta comiendo")

    def dormir(self):
        print(f"El animal {self.nombre}, esta durmiendo")

# Clase Hija
class Perro(Animal):
    def ladrar(self):
        print("Gua Gua")

class Gato(Animal):
    def rasgar(self):
        print("Rasgando un mueble")

# Uso
perro1 = Perro("Oso", 10, 14)
perro1.comer()      # Método heredado
perro1.ladrar()     # Método propio
```

### 4. Super() - Herencia Avanzada

`super()` permite acceder a métodos de la clase padre desde la clase hija.

```python
class Vehiculo:
    def __init__(self, marca, modelo, anio):
        self.marca = marca
        self.modelo = modelo
        self.anio = anio

    def mostrar_informacion(self):
        return f"Marca: {self.marca}, Modelo: {self.modelo}, Año: {self.anio}"

class Auto(Vehiculo):
    def __init__(self, marca, modelo, anio, cilindrada, color):
        # Llamar al constructor del padre
        super().__init__(marca, modelo, anio)
        self.cilindrada = cilindrada
        self.color = color

    def mostrar_informacion(self):
        # Llamar al método del padre y extenderlo
        mensaje = super().mostrar_informacion()
        print(f"{mensaje}, Cilindrada: {self.cilindrada}, Color: {self.color}")
```

## 💻 Ejercicios Realizados - Clase 2

| Archivo              | Descripción                                | Conceptos                                                            |
| -------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| `init.py`            | Clase Auto con atributos y métodos básicos | Clases, objetos, constructor, métodos, instanciación                 |
| `calculadora.py`     | Calculadora con historial de operaciones   | Clases, atributos de instancia, métodos, listas, validaciones        |
| `cuenta_bancaria.py` | Sistema de cuenta bancaria con operaciones | Encapsulamiento (público, protegido, privado), métodos, validaciones |
| `herencia.py`        | Sistema de animales con herencia           | Herencia básica, clase padre, clases hijas                           |
| `herencia_2.py`      | Sistema de vehículos con `super()`         | Herencia avanzada, `super()`, sobrescritura de métodos               |
| `problema1.py`       | Mascota Virtual (alimentar, jugar)         | Clases, métodos, atributos con valores por defecto, validaciones     |
| `problema2.py`       | Figuras Geométricas (Cuadrado y Círculo)   | Herencia, `super()`, módulo math, cálculos matemáticos               |

## 📝 Detalles de Ejercicios - Clase 2

### Calculadora (`calculadora.py`)

- **Funcionalidad:** Realiza operaciones matemáticas y guarda un historial
- **Métodos:** `sumar()`, `restar()`, `multiplicar()`, `division()`, `imprimir()`
- **Características:** Validación de división por cero, historial de operaciones

### Cuenta Bancaria (`cuenta_bancaria.py`)

- **Funcionalidad:** Simula una cuenta bancaria con operaciones básicas
- **Métodos:** `depositar()`, `retirar()`, `ver_saldo()`
- **Características:** Validación de PIN, validación de saldo, encapsulamiento de datos sensibles

### Problema 1: Mascota Virtual (`problema1.py`)

- **Atributos:** nombre, tipo, hambre (0-10), felicidad (0-10)
- **Métodos:** `alimentar()`, `jugar()`, `mostrar_informacion()`
- **Características:** Validaciones de límites, valores por defecto

### Problema 2: Figuras Geométricas (`problema2.py`)

- **Clase Padre:** `Figura` con método `pintar()`
- **Clases Hijas:** `Cuadrado` y `Circulo` con método `calcular_area()`
- **Características:** Uso de módulo `math`, herencia, `super()`

## 🎓 Conceptos Clave - Clase 2

✅ Clases y Objetos  
✅ Constructor (`__init__`)  
✅ Atributos de clase e instancia  
✅ Métodos  
✅ Encapsulamiento (público, protegido, privado)  
✅ Herencia  
✅ `super()` para acceder a la clase padre  
✅ Sobrescritura de métodos  
✅ Type hints (anotaciones de tipo)  
✅ Validaciones en métodos

---

## 🚀 Cómo Ejecutar los Archivos

Para ejecutar cualquier archivo Python, usa el siguiente comando en la terminal:

```bash
# Clase 1
python clase1/init.py
python clase1/problema1.py

# Clase 2
python clase2/init.py
python clase2/calculadora.py
python clase2/cuenta_bancaria.py
```

---

## 📌 Notas Importantes

1. **Indentación:** Python usa indentación (espacios o tabs) para definir bloques de código. Es fundamental mantener una indentación consistente.

2. **Todo es un objeto:** En Python, todo es un objeto, incluyendo números, strings, listas, funciones y clases.

3. **Tipado dinámico:** No es necesario declarar el tipo de una variable, Python lo infiere automáticamente.

4. **PEP 8:** Convención de estilo de código en Python (snake_case para variables y funciones, PascalCase para clases).

5. **Encapsulamiento:** Aunque Python permite acceder a atributos "protegidos" y "privados", es una mala práctica hacerlo.

---

## 📚 Recursos Adicionales

- [Documentación oficial de Python](https://docs.python.org/es/3/)
- [Tutorial de Python en español](https://docs.python.org/es/3/tutorial/)
- [PEP 8 - Guía de estilo](https://peps.python.org/pep-0008/)
- [Real Python - OOP Tutorial](https://realpython.com/python3-object-oriented-programming/)

---

## 👨‍💻 Información del Curso

**Grupo:** G28 Backend  
**Instructor:** Linder  
**Inicio:** 8 de enero de 2026  
**Última actualización:** 9 de enero de 2026
