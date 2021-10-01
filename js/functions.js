

// FECHA DEL DIA
window.onload = function () {
  let fecha = new Date(); //Fecha actual
  let mes = fecha.getMonth() + 1; //obteniendo mes
  let dia = fecha.getDate(); //obteniendo dia
  let ano = fecha.getFullYear(); //obteniendo año

  if (dia < 10) dia = "0" + dia; //agrega cero si la hora menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si los minutos menor de 10
  document.getElementById("fechaActual").value = ano + "-" + mes + "-" + dia;
};

const addIn = () => {
  let adddate = document.getElementById("fechaActual").value;
  let rubro = document.getElementById("conceptoDineroIngresar").value;
  let importe = parseFloat(document.getElementById("dineroAIngresar").value);
  let trans = "I";
  let tipo = "";
  let id = inOutt.length + 1;
  inOutt.push({
    id: id,
    inOut: adddate,
    rubro: rubro,
    importe: importe,
    trans: trans,
    tipo: tipo,
  });
  saldoAcumulado = saldoAcumulado + importe;

  let dinero = document.getElementById("dineroDisponible");

  dinero.innerHTML = saldoAcumulado;
  document.getElementById("conceptoDineroIngresar").value = "";
  document.getElementById("dineroAIngresar").value = "";
};

const addOut = () => {
  let adddate = document.getElementById("fechaActual").value;
  let rubro = document.getElementById("origenDelGasto").value;
  let importe = parseFloat(document.getElementById("montoAQuitar").value);
  let trans = "E";
  let tipo = document.getElementById("selectorDeRubros").value;
  let id = inOutt.length + 1;
  inOutt.push({
    id: id,
    inOut: adddate,
    rubro: rubro,
    importe: importe,
    trans: trans,
    tipo: tipo,
  });
  saldoAcumulado = saldoAcumulado - importe;

  let dinero = document.getElementById("dineroDisponible");

  dinero.innerHTML = saldoAcumulado;
  document.getElementById("origenDelGasto").value = "";
  document.getElementById("montoAQuitar").value = "";
};

function actualizarDinero() {
  for (let index = 0; index < inOutt.length; index++) {
    let agregarATabla = document.getElementById("tablaDeMoviemientos");
    if (inOutt[index].trans === "E") {
      agregarATabla.innerHTML += `<tr id="ingresoRojo">
                                <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                <td>${inOutt[index].rubro}</td>
                                <td>$ ${inOutt[index].importe}<span id="dispId">${inOutt[index].id}</span></td>
                                <td><button type="button" class="btn btn-danger" id="borrarArray">
                                <i class="fas fa-trash-alt" onclick="deleteRow(this)"></i>
                              </button></td>
                              </tr>`;
    } else {
      agregarATabla.innerHTML += `<tr id="ingresoVerde">
                                <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                <td>${inOutt[index].rubro}</td>
                                <td>$ ${inOutt[index].importe}<span id="dispId">${inOutt[index].id}</span></td>
                                <td><button type="button" class="btn btn-danger" id="borrarArray">
                                <i class="fas fa-trash-alt" onclick="deleteRow(this)"></i>
                              </button></td>
                              </tr>`;
    }
  }
}

function nuevoMovimientoIngreso() {
  for (let index = inOutt.length - 1; index < inOutt.length; index++) {
    let agregarATabla = document.getElementById("tablaDeMoviemientos");

    agregarATabla.innerHTML += `<tr id="ingresoVerde">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}<span id="dispId">${inOutt[index].id}</span></td>
                                  <td><button type="button" class="btn btn-danger">
                                <i class="fas fa-trash-alt" onclick="deleteRow(this)"></i>
                              </button></td>
                                </tr>`;
  }
}
function nuevoMovimientoIngresoSalida() {
  for (let index = inOutt.length - 1; index < inOutt.length; index++) {
    let agregarATabla = document.getElementById("tablaDeMoviemientos");

    agregarATabla.innerHTML += `<tr id="ingresoRojo">
                                    <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                    <td>${inOutt[index].rubro}</td>
                                    <td>$ ${inOutt[index].importe}<span id="dispId">${inOutt[index].id}</span></td>
                                    <td><button type="button" class="btn btn-danger">
                                  <i class="fas fa-trash-alt" onclick="deleteRow(this)"></i>
                                </button></td>
                                  </tr>`;
  }
}

function deleteRow(btn) {
  var row = btn.parentNode.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function barradegastos() {
  let dineroSal = 0;
  let dineroEnt = 0;
 

  for (let index = 0; index < inOutt.length; index++) {
    if (inOutt[index].trans === "E") {
      dineroSal += inOutt[index].importe;
    } else {
      dineroEnt += inOutt[index].importe;
    }
  }

  saldoAcumulado = dineroEnt - dineroSal;

  let dinero = document.getElementById("dineroDisponible");
  dinero.innerHTML = saldoAcumulado;
}

let comidaBarra = 0;
let transporteBarra = 0;
let viviendaBarra = 0;
let hobbiesBarra = 0;
let serviciosBarra = 0;
let variosBarra = 0;
function progresoGastos() {
  for (let index = 0; index < inOutt.length; index++) {
    if (inOutt[index].tipo === "comida") {
      comidaBarra += inOutt[index].importe;
    } else if (inOutt[index].tipo === "transporte") {
      transporteBarra += inOutt[index].importe;
    } else if (inOutt[index].tipo === "vivienda") {
      viviendaBarra += inOutt[index].importe;
    } else if (inOutt[index].tipo === "hobbies") {
      hobbiesBarra += inOutt[index].importe;
    } else if (inOutt[index].tipo === "servicios") {
      serviciosBarra += inOutt[index].importe;
    } else if (inOutt[index].tipo === "varios") {
      variosBarra += inOutt[index].importe;
    }
  }

  gastosTotales =
    transporteBarra +
    comidaBarra +
    viviendaBarra +
    hobbiesBarra +
    serviciosBarra +
    variosBarra;
    
  comidaBarra = parseInt((comidaBarra * 100) / gastosTotales);
  transporteBarra = parseInt((transporteBarra * 100) / gastosTotales);
  viviendaBarra = parseInt((viviendaBarra * 100) / gastosTotales);
  hobbiesBarra = parseInt((hobbiesBarra * 100) / gastosTotales);
  serviciosBarra = parseInt((serviciosBarra * 100) / gastosTotales);
  variosBarra = parseInt((variosBarra * 100) / gastosTotales);
  

  let barComida = document.getElementById("barComida");
  barComida.style.width = comidaBarra + "%";

  let barTransporte = document.getElementById("barTransporte");
  barTransporte.style.width = transporteBarra + "%";

  let barVivienda = document.getElementById("barVivienda");
  barVivienda.style.width = viviendaBarra + "%";

  let barHobbies = document.getElementById("barHobbies");
  barHobbies.style.width = hobbiesBarra + "%";

  let barServicios = document.getElementById("barServicios");
  barServicios.style.width = serviciosBarra + "%";

  let barVarios = document.getElementById("barVarios");
  barVarios.style.width = variosBarra + "%";
}

function cambiarColorFondoRed(){
  document.getElementById('navbarColor').style.background = '#e76f51'; 
  document.getElementById('offcanvasNavbar').style.background = '#f4a261'; 
  document.getElementById('fondoSuperior').style.background = '#f4a261';
  
}
function cambiarColorFondoBlue(){
  document.getElementById('navbarColor').style.background = '#219ebc'; 
  document.getElementById('offcanvasNavbar').style.background = '#8ecae6'; 
  document.getElementById('fondoSuperior').style.background = '#8ecae6';
  
}
function cambiarColorFondoYelow(){
  document.getElementById('navbarColor').style.background = '#f77f00'; 
  document.getElementById('offcanvasNavbar').style.background = '#fcbf49'; 
  document.getElementById('fondoSuperior').style.background = '#fcbf49';
  
}
function cambiarColorFondoOriginal(){
  document.getElementById('navbarColor').style.background = '#3f37c9'; 
  document.getElementById('offcanvasNavbar').style.background = '#5390d9'; 
  document.getElementById('fondoSuperior').style.background = '#5390d9';
  
}
function cambiarColorFondoGreen(){
  document.getElementById('navbarColor').style.background = '#4fab72'; 
  document.getElementById('offcanvasNavbar').style.background = '#93d1a7'; 
  document.getElementById('fondoSuperior').style.background = '#93d1a7';
  
}

let colorRed = document.getElementById('botonRed');
colorRed.onclick = () => {
  cambiarColorFondoRed()
  localStorage.setItem('estado', 1);
}
let colorBlue = document.getElementById('botonBlue');
colorBlue.onclick = () => {
  cambiarColorFondoBlue()
  localStorage.setItem('estado', 0);
}
let colorYelow = document.getElementById('botonYelow');
colorYelow.onclick = () => {
  cambiarColorFondoYelow()
  localStorage.setItem('estado', 2);
}
let colorOriginal = document.getElementById('botonOriginal');
colorOriginal.onclick = () => {
  cambiarColorFondoOriginal()
  localStorage.setItem('estado', 3);
}

let colorGreen = document.getElementById('botonGreen');
colorGreen.onclick = () => {
  cambiarColorFondoGreen()
  localStorage.setItem('estado', 4);
}

function borrarObjeto(i) {
  let obj = i;
  console.log(inOutt.obj);
}

actualizarDinero();
let saldoAcumulado = 0;
barradegastos();
progresoGastos();

let botonAgregar = document.getElementById('btnAgregarDinero');
botonAgregar.onclick = () => {
  
    addIn();
    nuevoMovimientoIngreso();
    //agregar el movimiento a la tabla
    progresoGastos();
  
}


let botonQuitar = document.getElementById('btnAgregarEgreso')
botonQuitar.onclick = () => {
  addOut();
  nuevoMovimientoIngresoSalida();
  progresoGastos();
}


let borrar = document.getElementById('borrarArray');
borrar.addEventListener('click', validarr)

function validarr(e){
let formu = e.target;
console.log(formu[1]);
}



miStorage = window.localStorage;
let estado = localStorage.getItem('estado');


if(estado==1)
cambiarColorFondoRed();
else if(estado==0)
cambiarColorFondoBlue()
else if(estado==2)
cambiarColorFondoYelow()
else if(estado==3)
cambiarColorFondoOriginal()
else if(estado==4)
cambiarColorFondoGreen()