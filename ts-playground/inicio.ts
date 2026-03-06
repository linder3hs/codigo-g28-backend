// que tipo es?
let nombre: string = "Linder";
let precio: number = 99.99;
let esMayorDeEdad: boolean = true;

let alumnos: string[] = ["Juan", "Hugo", "Paco"];
alumnos.push("Luis");

let cantidades: number[] = [100, 200, 300];

// como podriamos hacer si queremos que una variable inicie en null y luego su valor cambie
let description: string | null = null;
description = "hola me llamo juan";
description = null;

let descuento: number | undefined = undefined;
descuento = 10;

// interfaces
interface Person {
  nombre: string;
  apellido: string;
  edad: number;
  esMayor: boolean;
  celular?: number; // opcional cuando agregamo el "?"
}

const persona1: Person = {
  apellido: "Hassinger",
  edad: 99,
  nombre: "Linder",
  esMayor: true,
  celular: 99999,
};

const persona2: Person = {
  nombre: "Juan",
  apellido: "Perez",
  esMayor: true,
  edad: 88,
};
