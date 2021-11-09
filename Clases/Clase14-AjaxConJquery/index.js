const URL = 'https://jsonplaceholder.typicode.com/posts';

$("body").prepend('<button id="btn1">GET</button>');

$('#btn1').click(() => {
    $.get(URL, function(respuesta, estado) {
        if (estado === 'success') {
            const misDatos = respuesta;
            for (const dato of misDatos) {
                $('body').prepend(`
                <div>
                    <h3>${dato.title}</h3>
                    <p>${dato.body}</p>
                </div>
                `);
            }
        }
    });
});

$("body").prepend('<button id="btn2">POST</button>');
const infoPost = { nombre: "Francisco", profesion: "Programador" }

$("#btn2").click(() => {
    $.post(URL, infoPost, (respuesta, estado) => {
        if (estado === "success") {
            $("body").prepend(`
                <div>
                    Guardado: ${respuesta.nombre}
                </div>
            `);
        }
    })
});

const URLJSON = "./datos.json";
$("body").prepend('<button id="btn3">JSON</button>');

$("#btn3").click(() => {
    $.getJSON(URLJSON, (respuesta, estado) => {
        if (estado === "success") {
            let misDatos = respuesta;
            for (const dato of misDatos) {
                $("body").prepend(`
                    <div>
                        <h3>${dato.name}</h3>
                        <p>${dato.email}</p>
                    </div>
                `);
            }
        }
    })
});

$(document).ready(function() {
    const APIURL = 'https://jsonplaceholder.typicode.com/posts';
    const infoPost = { nombre: "Francisco", profesion: "Programador" }

    $("body").prepend('<button id="btn4">ENVIAR API</button>');
    $("#btn4").click( () => {
        $.ajax({
            method: "POST",
            url: APIURL,
            data: infoPost,
            success: function(respuesta) {
                $("body").prepend(`<div>${respuesta.nombre}</div>`);
            }
        });
    })
});






































