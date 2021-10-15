let nombreIngresado = prompt("Ingrese su nombre");
let apellidoIngresado = prompt("Ingrese su apellido");

let operacion = prompt("Hola " + nombreIngresado + " " + apellidoIngresado + ". " + "Ingrese la operación a realizar: \n 1 => Sumar, \n 2 => Restar, \n 3 => Multiplicar, \n 4 => Dividir");
// alert(nombreIngresado);
let primerValor = "";
let segundoValor = "";

if (operacion !== "" && (operacion === "1"|| operacion === "2" || operacion === "3" || operacion === "4")) {
    primerValor = prompt("Ingrese el primer valor");
    segundoValor = prompt("Ingrese el segundo valor");
    primerValor = parseInt(primerValor);
    segundoValor = parseInt(segundoValor);
    let operacionMatematica = "";

    let resultado = 0;
    if (operacion === "1") {
        alert("La operación que va realizar sera SUMAR");
        resultado = primerValor + segundoValor;
        operacionMatematica = "Suma";
    } else if (operacion === "2") {
        alert("La operación que va realizar sera RESTAR");
        resultado = primerValor - segundoValor;
        operacionMatematica = "Resta";
    } else if (operacion === "3") {
        alert("La operación que va realizar sera MULTIPLICAR");
        resultado = primerValor * segundoValor;
        operacionMatematica = "Multiplicación";
    }else if (operacion === "4") {
        alert("La operación que va realizar sera DIVIDIR");
        resultado = primerValor / segundoValor;
        operacionMatematica = "División";
    }

    alert("La " + operacionMatematica + " de los números " + primerValor + " y " + segundoValor + " es " + resultado);
} else {
    alert("ERROR: Debe escribir el valor de 1,2,3 o 4 para elegir la operación a realizar");
}









