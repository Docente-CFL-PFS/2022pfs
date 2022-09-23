let pSubtitulo = document.querySelector("#pSubtitulo");
let btnAgregar = document.querySelector("#btnAgregar");
let btnBuscar = document.querySelector("#btnBuscar");
let btnDuracion = document.querySelector("#btnDuracion");

pSubtitulo.innerHTML="Ejemplo CR con arreglo de objetos en JS - Busqueda por todos y uno";

let pistas = [];
load();

btnAgregar.addEventListener("click", () => {
    console.log("Función Agregar");
    let identificador = parseInt(document.querySelector('#identificador').value);
    let titulo = document.querySelector('#titulo').value;
    let duracion = parseInt(document.querySelector('#duracion').value);
    let interprete = document.querySelector('#interprete').value;
    let renglon = {
        "identificador": identificador,
        "titulo": titulo,
        "duracion": duracion,
        "interprete": interprete,
    };
    pistas.push(renglon);
    document.querySelector('#identificador').value="";
    document.querySelector('#titulo').value="";
    document.querySelector('#duracion').value="";
    document.querySelector('#interprete').value="";
    mostrarPistas();
});
btnBuscar.addEventListener("click", () => {
    console.log("Función Buscar");
    let identificador = parseInt(document.querySelector('#identificador').value);
    if (identificador) {
        load(identificador);
    }
    document.querySelector('#identificador').value="";
})
btnDuracion.addEventListener("click", () => {
    console.log("Función Duración");
    let total = 0;
    for (let i = 0; i < pistas.length; i++) {
        total += pistas[i].duracion;
    }
    let max = pistas[0].duracion;
    for (let r of pistas) {
        if (max <  r.duracion)
            max = r.duracion;
    }
    document.querySelector("#total").innerHTML = `
    <p>Duración Total: ${total}</p>
    <p>Duración Máxima: ${max}</p>
    `;
});

function mostrarPistas() {
    let html = "";
    for (let r of pistas) {
        html += `
            <tr>
            <td>${r.identificador}</td>
            <td>${r.titulo}</td>
            <td>${r.duracion}</td>
            <td>${r.interprete}</td>
            <td></td>
            </tr>
        `; 
    }
    document.querySelector("#tblPistas").innerHTML = html;
}

async function load(identificador) {
    pistas = [];
    let url = "";
    if (identificador) 
        url = `/pista/${identificador}`;
    else
        url = '/pista';
    let respuesta = await fetch(url);
    if (respuesta.ok) {
        if (identificador) 
            pistas.push(await respuesta.json());
        else
            pistas = await respuesta.json();
    }
    mostrarPistas()
}