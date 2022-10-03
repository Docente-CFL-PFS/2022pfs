let pSubtitulo = document.querySelector("#pSubtitulo");
pSubtitulo.innerHTML="Ejemplo Concesionaria - un vehiculo";

let parametros = [];
function procesarParametros() {
    let parStr = window.location.search.substr(1);
    let parArr = parStr.split("&");
    for (let i = 0; i < parArr.length; i++) {
        let par = parArr[i].split("=");
        parametros[par[0]] = par[1];
    }
}

load();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function load() {
    try {
        vehiculos = [];
        procesarParametros();
        let url = `/vehiculo/${parametros['dominio']}`;
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let vehiculo = await respuesta.json();
            document.querySelector("#pTitulo").innerHTML = `Vehiculo: ${vehiculo['dominio']}`;
            document.querySelector("#pSubtitulo").innerHTML="Ejemplo de registro unico en Form";
            document.querySelector('#dominio').value = vehiculo['dominio'];
            document.querySelector('#marca').value = vehiculo['marca'];
            document.querySelector('#modelo').value = vehiculo['modelo'];
            document.querySelector('#año').value = vehiculo['año'];
            document.querySelector('#precio').value = vehiculo['precio'];
            if (vehiculo['capacidad']==undefined)
                document.querySelector('#capacidad').value = "-"
            else
                document.querySelector('#capacidad').value = vehiculo['capacidad'];
        } else {
            document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo URL`;
        }
    } catch (error) {
        document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo en Conexion`;    
    }
}

async function aServidor(datos, accion) {
    let respuesta;
    switch (accion) {
        case 'A': {     //ALTA
            respuesta = await fetch('/vehiculo', {
                method :'POST',
                headers: { 'Content-Type' : 'application/json' },
                body : JSON.stringify(datos)
            });
        } 
    }
    return ((await respuesta.text()) == "ok");
}