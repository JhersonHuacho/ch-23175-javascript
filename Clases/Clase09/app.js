// Eventos del mouse (Mouse Event)
let boton = document.getElementById("btnMain");
boton.onclick = () => console.log("Click");
boton.onmousemove = () => console.log("Move");

// Eventos del teclado (Keyboard Event)
let input1 = document.getElementById("nombre");
let input2 = document.getElementById("edad");

input1.onkeyup = () => console.log("Keyup");
input2.onkeydown = () => console.log("keyDown");

// Evento Change (Change Event)
input1.onchange = () => console.log("valor1");
input2.onchange = () => console.log("valor2");

// Evento Submit (Submit Event)
let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    // cancelamos el comportamiento del evento
    e.preventDefault();
    // Obtenemos el elemento desde el cual se disparó el evento
    let formulario = e.target;
    console.log("formulario",formulario);
    // Obtengo el valor del primer hijo
    console.log("formulario.children[0].value", formulario.children[0].value);
    // Obtengo el valor del segundo hijo
    console.log("formulario.children[1].value", formulario.children[1].value);

    console.log("Formulario Enviado");
}