let pSubtitulo = document.querySelector("#pSubtitulo");
let btnAgregar = document.querySelector("#btnAgregar");
let btnBuscar = document.querySelector("#btnBuscar");
let btnBuscaA = document.querySelector("#btnBuscaA");
let btnBuscaC = document.querySelector("#btnBuscaC");

pSubtitulo.innerHTML="Ejemplo Concesionaria";

let vehiculos = [];
load();

btnAgregar.addEventListener("click", async () => {
    console.log("Función Agregar");
    let dominio = document.querySelector('#dominio').value;
    let marca = document.querySelector('#marca').value;
    let modelo = document.querySelector('#modelo').value;
    let año = parseInt(document.querySelector('#año').value);
    let precio = parseInt(document.querySelector('#precio').value);
    let capacidad = parseInt(document.querySelector('#capacidad').value);
    let tipo = 'Auto';
    if (capacidad) {
        tipo = 'Camioneta';    
    }
    let renglon = {
        "cantidad" : 1,
        "vehiculos" : [
            {
                "tipo" : tipo,
                "dominio" : dominio,
                "marca" : marca,
                "modelo" : modelo,
                "año" : año,
                "precio" : precio,
                "capacidad" : capacidad
            }
        ]
    };
    if (await aServidor(renglon,'A')) {
        load();
    }
    document.querySelector('#dominio').value="";
    document.querySelector('#marca').value="";
    document.querySelector('#modelo').value="";
    document.querySelector('#año').value="";
    document.querySelector('#precio').value="";
    document.querySelector('#capacidad').value="";
});
btnBuscar.addEventListener("click", () => {
    console.log("Función Buscar");
    let dominio = document.querySelector('#dominio').value;
    if (dominio) 
        load(dominio);
    else
        load();
    document.querySelector('#dominio').value="";
})
btnBuscaA.addEventListener("click", () => {
    console.log("Función Buscar Autos");
    load('A')
})
btnBuscaC.addEventListener("click", () => {
    console.log("Función Buscar Camionetas");
    load('C')
})

function mostrarVehiculos() {
    let html = "";
    for (let r of vehiculos) {
        html += `
            <tr>
            <td><a href="./ejemploVehiculo.html?dominio=${r.dominio}">${r.dominio}</a></td>
            <td><input class="vacio" type="text" name="" value="${r.marca}" id="mar${r.dominio}"></td>
            <td><input class="vacio" type="text" name="" value="${r.modelo}" id="mod${r.dominio}"></td>
            <td><input class="vacio" type="text" name="" value="${r.año}" id="año${r.dominio}"></td>
            <td><input class="vacio" type="text" name="" value="${r.precio}" id="pre${r.dominio}"></td>
            <td><input class="vacio" type="text" name="" value="${(r.capacidad==undefined)?"-":r.capacidad}" id="cap${r.dominio}"></td>
            <td><button class="btnDelVehiculo" dominio="${r.dominio}">Borrar</button>
                <button class="btnUpdVehiculo" dominio="${r.dominio}">Actualizar</button>
            </td>
            </tr>
        `; 
    }
    document.querySelector("#tblVehiculos").innerHTML = html;
    let btnBorrar = document.querySelectorAll('.btnDelVehiculo');
    btnBorrar.forEach(bd => { bd.addEventListener('click', async () => {
        let dominio = bd.getAttribute('dominio');
        if (await aServidor(dominio,'D')) {
            load();
        }    
    })})
    let btnModificar = document.querySelectorAll('.btnUpdVehiculo');
    btnModificar.forEach(bd => { bd.addEventListener('click', async () => {
        let dominio = bd.getAttribute('dominio');
        let renglon = {
            "cantidad" : 1,
            "vehiculos" : [
                {
                    "tipo" : `${(document.querySelector(`#cap${dominio}`).value=='-')?'Auto':'Camioneta'}`,
                    "dominio" : dominio,
                    "marca" : document.querySelector(`#mar${dominio}`).value,
                    "modelo" : document.querySelector(`#mod${dominio}`).value,
                    "año" : document.querySelector(`#año${dominio}`).value,
                    "precio" : document.querySelector(`#pre${dominio}`).value,
                    "capacidad" : document.querySelector(`#cap${dominio}`).value
                }
            ]
        }
        console.log(renglon);
        if (await aServidor(renglon,'U')) {
            load();
        }    
    })})
}

async function load(dominio) {
    vehiculos = [];
    let url = "";
    switch (dominio) {
        case 'A': {
                url = `/vehiculo/autos`;
                dominio = '';
                break;
            }
        case 'C': {
                url = `/vehiculo/camionetas`;
                dominio = '';
                break;
            }
        default: {
                if (dominio) 
                    url = `/vehiculo/${dominio}`;
                else
                    url = '/vehiculo';            
                break;
            }
    }
    let respuesta = await fetch(url);
    if (respuesta.ok) {
        if (dominio) 
            vehiculos.push(await respuesta.json());
        else
            vehiculos = await respuesta.json();
    }
    mostrarVehiculos()
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
            break;
        } 
        case 'D' : {    //ELIMINACION
            respuesta = await fetch(`/vehiculo/${dominio}`, {
                method : 'DELETE'
            });   
            break;         
        }
        case 'U': {     //ACTUALIZACION
            respuesta = await fetch(`/vehiculo/${datos.vehiculos[0].dominio}`, {
                method : 'PUT',
                headers : { 'Content-type' : 'application/json' },
                body : JSON.stringify(datos)
            });
            break;
        }
    }
    return ((await respuesta.text()) == "ok");
}