import { Credito } from './credito.js';

let deseaContinuar = false;

const getSpace = (headerTableKey, creditoKey) => {
  return "  ".repeat((headerTableKey.length - creditoKey.toString().length) < 0
    ? creditoKey.toString().length - headerTableKey.length
    : headerTableKey.length - creditoKey.toString().length);
}

const generarCalendario = (headerTable, calendario) => {
  const headTable = `| ${headerTable.nroCuota} | ${headerTable.capital} | ${headerTable.interes} | ${headerTable.cuota} | ${headerTable.saldo} |`;

  let calendarioTemplate = calendario.map(rowCuota => {
    let { nroCuota, capital, interes, cuota, saldo } = rowCuota;
    let espacioNroCuota = nroCuota.toString().length === 1 ? new Array(headerTable.nroCuota.length - 1).join("  ") : new Array(headerTable.nroCuota.length - 2).join("  ");
    let espacioCapital = getSpace(headerTable.capital, capital);
    let espacioInteres = getSpace(headerTable.interes, interes);
    let espacioCuota = getSpace(headerTable.cuota, cuota);
    let espacioSaldo = getSpace(headerTable.saldo, saldo);
    const row = `| ${nroCuota}${espacioNroCuota} | ${capital}${espacioCapital} | ${interes}${espacioInteres} | ${cuota}${espacioCuota} | ${saldo}${espacioSaldo}`;
    return row;
  });

  let bodyTable = "";

  calendarioTemplate.forEach(row => {
    bodyTable += `${row} \n`;
  });

  const tableContent = `${headTable} \n${bodyTable}`;

  return tableContent;
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

let mensajes = [
  "Tasa de interés: Es la valorización del precio del dinero, según los periodos de tiempo estipulados en una transacción comercial.",
  "Tasa de Costo Efectivo Anual: Es aquella tasa de interés que determina el costo real de crédito en el cual se incluye todos los costos y gastos que la operación genera.",
  "Capital: Es el importe del préstamo o la cantidad financiada.",
  "Tiempo: Es el lapso de periodo establecido en una transacción comercial, generalmente se toma como unidad el año (360 días).",
  "Número de cuotas: Plazo otorgado del crédito."
]

setInterval(() => {
  let min = 0;
  let max = mensajes.length - 1;
  let index = Math.floor(Math.random() * (max - min) + min);
  const span = document.querySelector("span");
  span.innerText = mensajes[index];
}, 3000);

do {

  const PRESTAMO = prompt(">>> Ingrese el monto del préstamo"); // => numeric
  const PLAZO = prompt(">>> Ingrese el plazo"); // => numeric
  const TEA = 52.87; // => Porcentaje
  const SEGURO_DESGRAVAMEN = 0.070; // => porcentaje

  let credito = new Credito(PRESTAMO, PLAZO, TEA, SEGURO_DESGRAVAMEN);
  let saldoCapital = Number(credito.prestamo);
  let calendario = [];
  const headerTable = {
    nroCuota: "Nº de cuota",
    capital: "CAPITAL",
    interes: "INTERES",
    cuota: "CUOTA",
    saldo: "SALDO"
  }

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

  console.log(headerTable.nroCuota.length);

  let tableContent = generarCalendario(headerTable, calendario);
  alert(`>> La Tasa Efectiva Mensual (TEA) es: ${credito.calculoTasaEfectivaMensual()} %\n>> Cronograma de Pagos:  \n\n${tableContent}`);

  generarCalendarioHtml(calendario);

  deseaContinuar = prompt("¿Desea continuar para ver otro cronograma?\n 0 => Para salir \n 1 => Para continuar.");
  deseaContinuar = Boolean(Number(deseaContinuar));

  if (!deseaContinuar) {
    alert("Gracias por usar el simulador de calendario de crédito");
  }

  

} while (deseaContinuar);