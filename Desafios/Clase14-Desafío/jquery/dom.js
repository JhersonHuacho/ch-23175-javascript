import Credito from './credito.js';

let listCalendarios = [];

// Cuando el html esta cargado
const cargarHistorialCronogramas = (paramStorageListCalendario) => {
  if (paramStorageListCalendario !== null) {
    const tbody = $('.table-historial tbody');
    tbody.html('');

    for (let index = 0; index < paramStorageListCalendario.length; index += 1) {
      tbody.append(`<tr></tr>`);
      Object.entries(paramStorageListCalendario[index]).forEach(([key, value]) => {
        $(".table-historial tbody tr").eq(index).fadeOut((1000 * index) + 1000, function () {
          $(".table-historial tbody tr").eq(index).fadeIn((2000 * index) + 1000, function () {
            if (key === 'calendario') {
              $(".table-historial tbody tr").eq(index).append(`<td>Ver</td>`);
            } else {
              $(".table-historial tbody tr").eq(index).append(`<td>${value}</td>`);
            }
          });
        });
      });

    }
  }
};

// Proceso de generar calendario
const generarCalendarioHtml = (calendario) => {
  const tbody = $('.table-cronograma tbody');
  tbody.html('');

  for (let index = 0; index < calendario.length; index += 1) {
    tbody.append('<tr></tr>');

    Object.entries(calendario[index]).forEach(([, value]) => {
      $('.table-cronograma tbody tr').eq(index).append(`<td>${value}</td>`);
    });
  }
};

const generarCronograma = (paramPrestamo, paramPlazo, paramTea) => {
  const SEGURO_DESGRAVAMEN = 0.070; // => porcentaje
  const credito = new Credito(paramPrestamo, paramPlazo, paramTea, SEGURO_DESGRAVAMEN);
  let saldoCapital = Number(credito.prestamo);
  const calendario = [];
  let rowCalendario = {
    nroCuota: 0,
    capital: 0,
    interes: 0,
    cuota: 0,
    saldo: saldoCapital.toFixed(2),
  };

  for (let cuota = 0; cuota <= credito.plazo; cuota += 1) {
    if (cuota === 0) {
      calendario.push(rowCalendario);
    } else {
      const interesCuota = Number(credito.calculoInteresCuota(saldoCapital));
      const amortizacionCapitalMensual = credito.calculoCuotaFijaMensual() - interesCuota;

      saldoCapital -= amortizacionCapitalMensual;

      rowCalendario = {
        nroCuota: cuota,
        capital: amortizacionCapitalMensual.toFixed(2),
        interes: interesCuota.toFixed(2),
        cuota: credito.calculoCuotaFijaMensual(),
        saldo: saldoCapital.toFixed(2),
      };

      calendario.push(rowCalendario);
    }
  }

  generarCalendarioHtml(calendario);

  // const storageCalendrio = localStorage.getItem('listCalendario');

  // if (storageCalendrio !== null) {
  //   listCalendarios = JSON.parse(storageCalendrio);
  // }

  const newSingleCalendario = {
    id: listCalendarios.length + 1,
    prestamo: paramPrestamo,
    plazo: paramPlazo,
    tea: paramTea,
    calendario,
  };

  listCalendarios.push(newSingleCalendario);
  // localStorage.setItem('listCalendario', JSON.stringify(listCalendarios));
  
  cargarHistorialCronogramas(listCalendarios);
  alert("ENVÍO EXITOSO: Los datos se guardaron correctamente.");

};

function validarInput(paramInput, index) {
  let validar = true;
  const mensaje = $(".mensaje").eq(index);

  if (paramInput.val() === '') {
    mensaje.show();
    validar = false;
  } else {
    mensaje.hide();
  }

  return validar;
}

function calcularCronograma(event) {
  event.preventDefault();
  const inputPrestamo = $('#prestamo');
  const inputPlazo = $('#plazo');
  const inputTea = $('#tea');
  let validar = true;

  if (validarInput(inputPrestamo, 0) === false) {
    validar = false;
  }

  if (validarInput(inputPlazo, 1) === false) {
    validar = false;
  }

  if (validarInput(inputTea, 2) === false) {
    validar = false;
  }

  if (validar === false) {
    return;
  }

  generarCronograma(inputPrestamo.val(), inputPlazo.val(), inputTea.val());

  inputPrestamo.val('');
  inputPlazo.val('');
  inputTea.val('');
}

$("form").on('submit', calcularCronograma);

$(document).ready(function () {
  // const storageListCalendario = localStorage.getItem('listCalendario');
  const URLJSON = "./db.json";
  $.getJSON(URLJSON, (respuesta, estado) => {
    if (estado === "success") {
        const storageListCalendario = respuesta;
        listCalendarios = storageListCalendario;
        cargarHistorialCronogramas(storageListCalendario);
    }
  })

  $(".mensaje").hide();
  $(".header-title span").animate({
    marginLeft: '40%'
  }).animate({
    fontSize: "38px"
  }).animate({
    fontSize: "27px"
  });
});
