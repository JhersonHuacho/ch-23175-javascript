// Declaraciòn de array vacío
const arrayA = [];
// Declaracion de array con nùmeros
const arrayB = [1,2];
// Declaracion de array con strings
const arrayC = ["C1","C2","C3"];
// Declaracion de array con booleanos
const arrayD = [true,false,true,false];
// Declaracion de array mixto
const arrayE = [1,false,"C4"];

const  numeros = [1,2,3,4,5];
let resultado1  = numeros[0] + numeros[2]; // 1 + 3 = 4; 
let resultado2  = numeros[1] + numeros[4]; // 2 + 5 = 7;
let resultado3  = numeros[1] + numeros[1]; // 2 + 2 = 4;

const numeros = [1, 2, 3, 4, 5];
for (let index = 0; index < 5; index++) {
    console.log(numeros[index]);
}

console.log(numeros.length);
console.log(numeros.toString());
numeros.push(50)
console.log(numeros);

console.log(numeros.join(", "));

const numeroDos = [100,200,300];
numeros.concat(numeroDos);
console.log(numeros);
console.log(numeros.slice(4,5));
