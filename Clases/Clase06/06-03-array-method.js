const numeros = [1,2,3,4,5,6,7,8,9,10];

const find = numeros.find(numero => numero > 3);
console.log(find);

const filter = numeros.filter(numero => numero > 3);
console.log(filter);

const map = numeros.map(numero => numero * 3);
console.log(map);