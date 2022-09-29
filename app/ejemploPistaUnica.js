let params = [];

function procesarParametros() {
    console.log(window.location.search);
    let paramsStr = window.location.search.substr(1); 
    console.log(paramsStr);
    let paramsArr = paramsStr.split("&");
    console.log(paramsArr);
    for (let i = 0; i < paramsArr.length; i++) {        
        let param = paramsArr[i].split("=");
        console.log(param);
        params[param[0]]=param[1];        
        console.log(params);
    }
}

load();

async function load() {
    try {
        procesarParametros();
        let url = `/pista/${params['index']}`;        
        let respuesta = await fetch(url);
        if (respuesta.ok) {
            let pista = await respuesta.json();
            document.querySelector("#pTitulo").innerHTML = `Pista: ${pista['identificador']}`;
            document.querySelector("#pSubtitulo").innerHTML="Ejemplo de registro unico en Form";
            document.querySelector('#identificador').value = pista['identificador'];
            document.querySelector('#titulo').value = pista['titulo'];
            document.querySelector('#duracion').value = pista['duracion'];
            document.querySelector('#interprete').value = pista['interprete'];
        } else {
            document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo URL`;
        }
    } catch (error) {
        document.querySelector("#pTitulo").innerHTML = `ERROR - Fallo en Conexion`;    
    }
}