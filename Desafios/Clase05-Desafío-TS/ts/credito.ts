let randomValue: any = 10;
randomValue = true;

console.log(randomValue.name);

let randomValueDos: unknown = 10;
console.log(randomValueDos.name);

// export class Credito {
//   constructor(prestamo, plazo, tea, seguro_desgravamen) {
//     this.prestamo = prestamo;
//     this.plazo = plazo;
//     this.tea = tea; // => Porcentaje
//     this.seguro_desgravamen = seguro_desgravamen; // => Porcentaje
//   }

//   // Cálculo de la Tasa Efectiva Mensual - TEM
//   calculoTasaEfectivaMensual = () => {
//     let tasaEfectivaMensual = ((Math.pow((1 + this.tea / 100), (30 / 360))) - 1) * 100;
//     return tasaEfectivaMensual.toFixed(2);
//   }

//   // Cálculo de la Cuota Fija Mensual - Para el cálculo de la Cuota Fija Mensual se utiliza la TEM
//   calculoCuotaFijaMensual = () => {
//     let tasaEfectivaMensual = Number(this.calculoTasaEfectivaMensual()); // => porcentaje
//     tasaEfectivaMensual = tasaEfectivaMensual / 100;
//     let cuotaFijaMensual = this.prestamo * ((tasaEfectivaMensual * (Math.pow(1 + tasaEfectivaMensual, 12))) / ((Math.pow(1 + tasaEfectivaMensual, 12)) - 1))
//     return cuotaFijaMensual.toFixed(2);
//   }

//   // Cáculo del Interés de la cuota
//   calculoInteresCuota = (saldoCapital) => {
//     let tasaEfectivaMensual = Number(this.calculoTasaEfectivaMensual()) / 100;
//     let interes = saldoCapital * tasaEfectivaMensual;
//     return interes.toFixed(2);
//   }

//   // Cálculo de la Amortización Mensual
//   calculoAmortizacionMensual = (saldoCapital) => {
//     let cuotaFijaMensual = Number(this.calculoCuotaFijaMensual());
//     let interes = Number(this.calculoInteresCuota(saldoCapital));
//     let amortizacionMensual = cuotaFijaMensual - interes;
//     return amortizacionMensual.toFixed(2);
//   }

// }

