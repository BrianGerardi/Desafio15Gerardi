class Persona {
  constructor(altura, peso, sexo, nombre, dni) {
    this.altura = altura;
    this.peso = peso;
    this.sexo = sexo;
    this.nombre = nombre;
    this.dni = dni;
  }
}
const maximoNumeroDni = 999999999;

let matias = new Persona(170, 90, "M", "Matias", 961981339);
let seba = new Persona(140, 80, "M", "Sebastian", 179611441);
let brian = new Persona(195, 120, "M", "Brian", 529284454);
let claudia = new Persona(170, 132, "F", "Claudia", 471497446);

listaDePersonas = [matias, seba, brian, claudia];

function ordenarPorDni(lista) {
  return lista.sort(function (a, b) {
    return a.dni - b.dni;
  });
}

function preguntarAgregarNuevaPersona() {
  let mensaje = prompt('¿Quiere agregar mas personas? "S" para si "N" para no');

  if (mensaje == "S") {
    listaDePersonas.push(agregarNuevaPersonaPrompt());
    listaDePersonasOrdenada = ordenarPorDni(listaDePersonas);
    preguntarAgregarNuevaPersona();
  } else if (mensaje == "N") {
  } else {
    alert("Error de ingreso");
    preguntarAgregarNuevaPersona();
  }
}

function CrearListaDePersonas() {
  console.log(listaDePersonasOrdenada);
  for (nuevaPersona of listaDePersonasOrdenada) {
    let content = document.createElement("div");
    content.innerHTML = `
       <p class="FormularioClientes"> Nombre: ${nuevaPersona.nombre} Altura: ${nuevaPersona.altura} Peso: ${nuevaPersona.peso} Sexo: ${nuevaPersona.sexo} Dni: ${nuevaPersona.dni} </p>
    `;
    content.id = "listaPersonas";
    document.body.appendChild(content);
  }
}
function borrarListaDePersonas() {
  let content = document.getElementById("listaPersonas");
  while (content != null) {
    content.remove();
    content = document.getElementById("listaPersonas");
  }
}

escribirListaDesdeStorage();
let listaDePersonasOrdenada = ordenarPorDni(listaDePersonas);
CrearListaDePersonas();
localStorage.clear();
escribirlistaDePersonasOrdenada();

let agregarBoton = $("#botonAgregarPersona");
agregarBoton.on("click", clickAnswer);
function clickAnswer() {
  preguntarAgregarNuevaPersona();
  borrarListaDePersonas();
  CrearListaDePersonas();
  escribirlistaDePersonasOrdenada();
}

$("#botonPersonas").append(
  '<button id="botonRemoverPersona" class="button">Remover una persona</button>'
);
let agregarBoton2 = $("#botonRemoverPersona");

agregarBoton2.on("click", clickAnswer2);
function clickAnswer2() {
  borrarPersonaPorDni();
  borrarListaDePersonas();
  CrearListaDePersonas();
  escribirListaDesdeStorage();
}

idBoton = ["#botonAgregarPersona", "#botonRemoverPersona"];
for (etiqueta of idBoton) {
  $(etiqueta).hover(
    function () {
      $(this).animate({ width: "300px" });
      $(this).css("background-color", "red");
    },
    function () {
      $(this).animate({ width: "250px" });
      $(this).css("background-color", "#4CAF50");
    }
  );
}

function borrarPersonaPorDni() {
  let dni = prompt("Ingrese DNI de la persona a Borrar");
  let a = 0;
  let len = listaDePersonasOrdenada.length;
  while (a <= len && listaDePersonasOrdenada[a].dni != dni) {
    a++;
  }
  if (a <= len) {
    localStorage.removeItem(a);
    if (a == len - 1) {
      listaDePersonas.pop();
    } else if (a == 0) {
      listaDePersonas = listaDePersonasOrdenada.slice(1);
    } else {
      let firstHalf = listaDePersonasOrdenada.slice(0, a);
      let secondHalf = listaDePersonasOrdenada.slice(a + 1);
      listaDePersonas = firstHalf.concat(secondHalf);
    }
    listaDePersonasOrdenada = ordenarPorDni(listaDePersonas);
  } else {
    alert("no se encuentra persona con este DNI");
  }
}

function escribirlistaDePersonasOrdenada() {
  let id = 0;
  for (nuevaPersona of listaDePersonasOrdenada) {
    id++;
    const JSONvalue = JSON.stringify(nuevaPersona);
    localStorage.setItem(id, JSONvalue);
  }
}

function escribirListaDesdeStorage() {
  let id = 1;
  let item = localStorage.getItem(id);

  while (item != null) {
    let object = JSON.parse(item);
    if (
      listaDePersonas.filter((nuevaPersona) => nuevaPersona.dni == object.dni)
        .length == 0
    ) {
      listaDePersonas.push(object);
    } else if (
      !listaDePersonas.filter((nuevaPersona) => nuevaPersona.dni == object.dni)
        .length >= 2
    ) {
      throw new Error("dos o mas personas con el mismo dni");
    }

    id++;
    item = localStorage.getItem(id);
  }
}

const urlGET = "./datosJSON/datos.JSON";
$("body").append(`<button id="btnGET">revele nuestro secreto</button>`);

$("#btnGET").click(() => {
  $.getJSON(urlGET, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta;
      for (dato of misDatos) {
        $("body").append(`<div>
         <h2>${dato.titulo}</h2>
         <p>${dato.lema}</p>
         </div>`);
      }
    }
  });
});

$("#DatosCliente").submit(function (event) {
  event.preventDefault();

  const nombre = $("#nombre").val();
  if (!/([a-z-A-Z])/.test(nombre)) {
    alert("Error de nombre, ingrese un nombre válido");
    return;
  }
  const peso = parseInt($("#peso").val());
  if (peso > 200 || peso <= 0) {
    alert("Error de peso, ingrese un valor entre 0 y 200");
    return;
  }
  const altura = parseInt($("#altura").val());
  if (altura > 360 || altura <= 0) {
    alert("Error de altura, ingrese un valor entre 0 y 360");
    return;
  }
  const dni = $("#dni").val();
  /* if (!0 < parseInt(dni) < maximoNumeroDni) {
    alert("Error de dni, ingrese un dni válido");
    return;
   } */
  const sexo = $("input[name=genero]:checked").val();

  //

  nuevaPersona = new Persona(altura, peso, sexo, nombre, dni);

  listaDePersonas.push(nuevaPersona);
  listaDePersonasOrdenada = ordenarPorDni(listaDePersonas);

  borrarListaDePersonas();
  CrearListaDePersonas();
  escribirlistaDePersonasOrdenada();
});
