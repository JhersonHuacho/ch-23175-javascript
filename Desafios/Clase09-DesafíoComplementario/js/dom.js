import { Credito } from './credito.js';

let form = document.querySelector("form");
form.addEventListener("submit", calcularCronograma);

function calcularCronograma (event) {
  event.preventDefault();
  let inputPrestamo = document.querySelector("#prestamo");
  let inputPlazo = document.querySelector("#plazo");
  let inputTea = document.querySelector("#tea");

  generarCronograma(inputPrestamo.value, inputPlazo.value, inputTea.value);
}

const generarCalendarioHtml = (calendario) => {
  const tbody = document.querySelector("tbody");
  
  for (let index = 0; index < calendario.length; index++) {
    let tr = document.createElement("tr");

    Object.entries(calendario[index]).forEach(([key, value]) => {
      let td = document.createElement("td");
      td.innerText = value;
      tr.appendChild(td);
    })

    tbody.appendChild(tr);
  }
  console.log(tbody);
}

const generarCronograma = (paramPrestamo, paramPlazo, paramTea) => {
  const SEGURO_DESGRAVAMEN = 0.070; // => porcentaje
  let credito = new Credito(paramPrestamo, paramPlazo, paramTea, SEGURO_DESGRAVAMEN);
  let saldoCapital = Number(credito.prestamo);
  let calendario = [];
  let rowCalendario = {
    nroCuota: 0,
    capital: 0,
    interes: 0,
    cuota: 0,
    saldo: saldoCapital.toFixed(2)
  };

  for (let cuota = 0; cuota <= credito.plazo; cuota++) {
    if (cuota === 0) {
      calendario.push(rowCalendario);
      continue;
    }
    let interesCuota = Number(credito.calculoInteresCuota(saldoCapital));
    let amortizacionCapitalMensual = credito.calculoCuotaFijaMensual() - interesCuota;

    saldoCapital = saldoCapital - amortizacionCapitalMensual;

    rowCalendario = {
      nroCuota: cuota,
      capital: amortizacionCapitalMensual.toFixed(2),
      interes: interesCuota.toFixed(2),
      cuota: credito.calculoCuotaFijaMensual(),
      saldo: saldoCapital.toFixed(2)
    }

    calendario.push(rowCalendario);
  }

  generarCalendarioHtml(calendario);
}