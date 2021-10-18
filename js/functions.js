

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




// EN ESTA FUNCION AGREGO UN UBJETO AL ARRAY SUMO EL IMPORTE AL TOTAL
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
  guardarLocal('movimientos', JSON.stringify(inOutt));
};

//AGREGO UN MOVIMIENTO DE GASTO AL ARRAY Y RESTO EL DINERO AL TOTAL
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
  guardarLocal('movimientos', JSON.stringify(inOutt));
  progresoGastos();
};

//TOMA TODOS LOS MOVIMIENTOS DEL ARRAY Y LOS AGREGA A LA TABLA
function actualizarDinero() {
  for (let index = 0; index < inOutt.length; index++) {
    // let agregarATabla = document.getElementById("tablaDeMoviemientos");
    if (inOutt[index].trans === "E") {
      $('#tablaDeMoviemientos').prepend (`<tr id="ingresoRojo">
                                <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                <td>${inOutt[index].rubro}</td>
                                <td>$ ${inOutt[index].importe}</td>
                                <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                X
                              </button></td>
                              </tr>`);
    } else {
      $('#tablaDeMoviemientos').prepend (`<tr id="ingresoVerde">
                                <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                <td>${inOutt[index].rubro}</td>
                                <td>$ ${inOutt[index].importe}</td>
                                <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                X
                              </button></td>
                              </tr>`);
    }
  }
}

//AGREGA EL INGRESO DE DINERO A LA TABLA CUANDO AGREGAMOS UN MOVIMIENTO NUEVO
function nuevoMovimientoIngreso() {
  for (let index = inOutt.length - 1; index < inOutt.length; index++) {
  

    $('#tablaDeMoviemientos').prepend (`<tr id="ingresoVerde">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}</td>
                                  <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                  X
                                  </button></td>
                                  </tr>`);
  }
}
//AGREGA UN MOVIMIENTO GASTO A LA TABLA Y AL ARRAY
function nuevoMovimientoIngresoSalida() {
  for (let index = inOutt.length - 1; index < inOutt.length; index++) {
    let agregarATabla = document.getElementById("tablaDeMoviemientos");

    $('#tablaDeMoviemientos').prepend (`<tr id="ingresoRojo">
                                    <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                    <td>${inOutt[index].rubro}</td>
                                    <td>$ ${inOutt[index].importe}</td>
                                    <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                    X
                                    </button></td>
                                    </tr>`);
  }
}

//BORRA FILA DE LA TABLA
function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  let ver = btn.id
  let probar  = inOutt.filter(inOutt => inOutt.id == ver);
  console.log(probar[0].id);
  
  
  for (let index = 0; index < inOutt.length; index++){
    if(inOutt[index].id === probar[0].id ){
        inOutt.splice(inOutt[index], 1);
        // console.log(inOutt[index].id);
        // console.log(inOutt[index]);
    }
  }
  console.log(inOutt);
  
}










//ACTUALIZA LA BARRA DE GASTOS A MEDIDA QUE VAMOS HACIENDO MOVIIENTOS
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
  dinero.innerHTML = new Intl.NumberFormat("de-DE").format(saldoAcumulado);
}



function progresoGastos() {
  let comidaBarra = 0;
let transporteBarra = 0;
let viviendaBarra = 0;
let hobbiesBarra = 0;
let serviciosBarra = 0;
let variosBarra = 0;
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
  

  // let barComida = document.getElementById("barComida");
  $('#barComida').css ('width', comidaBarra + "%");

  $('#barTransporte').css ('width', transporteBarra + "%");
  
  $('#barVivienda').css ('width', viviendaBarra + "%");

  $('#barHobbies').css ('width', hobbiesBarra + "%");

  $('#barServicios').css ('width', serviciosBarra + "%");
  
  $('#barVarios').css ('width', variosBarra + "%");
 
}

//CAMBIA LOS FONDOS DEL CSS
function cambiarColorFondoRed(){
  $('#navbarColor').css("background-color", "#e76f51");
  $('#offcanvasNavbar').css("background-color", "#f4a261");
  $('#fondoSuperior').css("background-color", "#f4a261");
  
}
function cambiarColorFondoBlue(){
  $('#navbarColor').css("background-color", '#219ebc');
  $('#offcanvasNavbar').css("background-color", '#8ecae6');
  $('#fondoSuperior').css("background-color", '#8ecae6');
  
}
function cambiarColorFondoYelow(){
  $('#navbarColor').css("background-color", '#f77f00');
  $('#offcanvasNavbar').css("background-color", '#fcbf49');
  $('#fondoSuperior').css("background-color", '#fcbf49');

  
}
function cambiarColorFondoOriginal(){
  $('#navbarColor').css("background-color", '#3f37c9');
  $('#offcanvasNavbar').css("background-color", '#5390d9');
  $('#fondoSuperior').css("background-color", '#5390d9');
  
}
function cambiarColorFondoGreen(){
  $('#navbarColor').css("background-color", '#4fab72');
  $('#offcanvasNavbar').css("background-color", '#93d1a7');
  $('#fondoSuperior').css("background-color", '#93d1a7');

  
}
$('#botonRed').click(function() {
  cambiarColorFondoRed()
  localStorage.setItem('estado', 1);
})

$('#botonBlue').click(function() {
  cambiarColorFondoBlue()
  localStorage.setItem('estado', 0);
})

$('#botonYelow').click(function() {
  cambiarColorFondoYelow()
  localStorage.setItem('estado', 2);
})

$('#botonOriginal').click(function() {
  cambiarColorFondoOriginal()
  localStorage.setItem('estado', 3);
})

$('#botonGreen').click(function() {
  cambiarColorFondoGreen()
  localStorage.setItem('estado', 4);
})




//AGREGA AL LOCALSTORAGE EL COLOR
miStorage = window.localStorage;
let estado = localStorage.getItem('estado');

//PREGUNTA DE QUE COLOR ESTA GUARDADO EN EL LS
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



///ENTREGABLE AJAX


const EJEMPLO = 'https://jsonplaceholder.typicode.com/todos';


$('.ajaxEjemplo').append('<button id="btn1">Historial</button>');

$('#btn1').click(() => { 
    $.get(EJEMPLO, function (resp,estado, state) {
          if(state.status === 200){
            let misDatos = resp;
            for (const dato of misDatos) {
              $(".ajaxEjemplo").append(`<tr id="ingresoVerde">
              <th scope="row" class="hiddDate">${dato.id}</th>
              <td>${dato.title}</td>
              <td>${dato.completed}</td>
            </tr>`);
            }  
          }else console.log('error');
    });
});


const infoPost =  { id: "1", inOutt: "1", title: "et porro tempora" , completed: "true"}
//Agregamos un botón con jQuery
$('.ajaxEjemplo').append('<button id="btn2">Agregar</button>');
//Escuchamos el evento click del botón agregado
$("#btn2").click(() => { 
    $.post(EJEMPLO, infoPost ,(resp, estado, state) => {
        if(estado === 'success'){
            $(".ajaxEjemplo").prepend(`<div>
Titulo Agregado: ${resp.title}
</div>`);
        }  else{
          $(".ajaxEjemplo").prepend(`<div>
Titulo No agregado
</div>`);
        }
    });
});




const PERSHP = 'https://hp-api.herokuapp.com/api/characters';


$('.ajaxEjemplo').append('<button id="btn3">Agregar Harry Potter</button>');

$('#btn3').click(() => { 
    $.get(PERSHP, function (resp,estado, state) {
console.log(resp[0].image);
          $(".ajaxEjemplo").append(`<div> </div></dic> <img src="${resp[0].image}" alt=""> </div>`);
        });
     
});
