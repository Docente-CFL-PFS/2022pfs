let pSubtitulo = document.querySelector("#pSubtitulo");
let btnAgregar = document.querySelector("#btnAgregar");

pSubtitulo.innerHTML="Ejemplo CR con arreglo de objetos en JS";

let discograficas = [];
load();

btnAgregar.addEventListener("click", () => {
    console.log("Función Agregar");
    let nombre = parseInt(document.querySelector('#nombre').value);
    let sede = document.querySelector('#sede').value;
    let ceo = parseInt(document.querySelector('#ceo').value);
    let año = document.querySelector('#año').value;
    let renglon = {
        "nombre": nombre,
        "sede": sede,
        "ceo": ceo,
        "año": año,
    };
    discograficas.push(renglon);
    document.querySelector('#nombre').value="";
    document.querySelector('#sede').value="";
    document.querySelector('#ceo').value="";
    document.querySelector('#año').value="";
    mostrarPistas();
});

function mostrarDiscograficas() {
    let html = "";
    for (let r of discograficas) {
        html += `
            <tr>
            <td>${r.nombre}</td>
            <td>${r.sede}</td>
            <td>${r.ceo}</td>
            <td>${r.año}</td>
            <td></td>
            </tr>
        `; 
    }
    document.querySelector("#tblPistas").innerHTML = html;
}

async function load() {
    let respuesta = await fetch('/discografica');
    if (respuesta.ok) {
        discograficas = await respuesta.json();
        mostrarDiscograficas();
    }
}