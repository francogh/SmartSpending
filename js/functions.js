
moment.locale('es')

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

const fechaya = function () {
  let fecha = new Date(); //Fecha actual
  let mes = fecha.getMonth() + 1; //obteniendo mes
  let dia = fecha.getDate(); //obteniendo dia
  let ano = fecha.getFullYear(); //obteniendo año

  if (dia < 10) dia = "0" + dia; //agrega cero si la hora menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si los minutos menor de 10
  document.getElementById("fechaActual1").value = ano + "-" + mes + "-" + dia;
  document.getElementById("fechaActual2").value = ano + "-" + mes + "-" + dia;
  document.getElementById("fechaActual3").value = ano + "-" + mes + "-" + dia;
  
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
console.log(inOutt);

//BORRA FILA DE LA TABLA
function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  let ver = btn.id
 

  let probar  = inOutt.find(inOutt => inOutt.id == ver);
 

  let possArry = inOutt.indexOf(probar);
  

  let elimColumn = inOutt.splice(possArry, 1);

  guardarLocal('movimientos', JSON.stringify(inOutt));
  progresoGastos();
  

  
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



$('#pdf').click(function() {
  var doc = new jsPDF();
  let alto = 40;
  doc.setFontSize(30);
  doc.setFontType("bold");
  doc.setTextColor(147,209,167)
  doc.text(60, 20 , 'Smart Spending');
  
  
    for (let index = 0; index < inOutt.length; index++) {
    
    
      
      doc.setFontSize(12);
      doc.setTextColor(0,0,0);
      doc.setFont("courier");
      let fecha = inOutt[index].inOut;
      let rubro = inOutt[index].rubro;
      let importe = new Intl.NumberFormat("de-DE").format(inOutt[index].importe);
        
  
      doc.text(20, alto , fecha+ "   " + rubro+"   "+"$"+importe);
      alto = alto + 10;
      
      
     
    }
 
  
  
  doc.save('SmartSpending.pdf');
	

	
})


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


let arrayDia = [];
$('#btnActualizarFecha').click(function() {
    let fechaSeleccionada = document.getElementById("fechaActual1").value;
    $("#tablaDeMoviemientosDia tr").remove(); 



  for (let index = 0; index < inOutt.length; index++) {
    if (inOutt[index].inOut == fechaSeleccionada) {
      if (inOutt[index].trans === "E") {
        $('#tablaDeMoviemientosDia').prepend (`<tr id="ingresoRojo">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}</td>
                                  <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                  X
                                </button></td>
                                </tr>`);
      } else {
        $('#tablaDeMoviemientosDia').prepend (`<tr id="ingresoVerde">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}</td>
                                  <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                  X
                                </button></td>
                                </tr>`);
      }
      
      arrayDia.push({
        id: inOutt[index].id,
        inOut: inOutt[index].adddate,
        rubro: inOutt[index].rubro, 
        importe: inOutt[index].importe,
        trans: inOutt[index].trans,
        tipo: inOutt[index].tipo,
      });
      
      
        
    }
    
//actualizo la barra del dia
let comidaBarra = 0;
let transporteBarra = 0;
let viviendaBarra = 0;
let hobbiesBarra = 0;
let serviciosBarra = 0;
let variosBarra = 0;

for (let index = 0; index < arrayDia.length; index++) {
  if (arrayDia[index].tipo === "comida") {
    comidaBarra += arrayDia[index].importe;
  } else if (arrayDia[index].tipo === "transporte") {
    transporteBarra += arrayDia[index].importe;
  } else if (arrayDia[index].tipo === "vivienda") {
    viviendaBarra += arrayDia[index].importe;
  } else if (arrayDia[index].tipo === "hobbies") {
    hobbiesBarra += arrayDia[index].importe;
  } else if (arrayDia[index].tipo === "servicios") {
    serviciosBarra += arrayDia[index].importe;
  } else if (arrayDia[index].tipo === "varios") {
    variosBarra += arrayDia[index].importe;
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
  

 //barras dia
 $('#barComidaDia').css ('width', comidaBarra + "%");

 $('#barTransporteDia').css ('width', transporteBarra + "%");
 
 $('#barViviendaDia').css ('width', viviendaBarra + "%");

 $('#barHobbiesDia').css ('width', hobbiesBarra + "%");

 $('#barServiciosDia').css ('width', serviciosBarra + "%");
 
 $('#barVariosDias').css ('width', variosBarra + "%");
    
  }
  
  
});


const fechaDiaSeleccionado = function () {
  const hoy = moment().subtract(1, 'month');

  let mes = hoy.format (('M')); //obteniendo mes
  let dia = hoy.format (('D')); //obteniendo dia
  let ano = hoy.format (('Y')); //obteniendo año

  if (dia < 10) dia = "0" + dia; //agrega cero si la hora menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si los minutos menor de 10
  let fechaMes = ano + "-" + mes + "-" + dia;
  let arrayMes = [];
  

  for (let index = 0; index < inOutt.length; index++) {
    if (inOutt[index].inOut > fechaMes) {
      if (inOutt[index].trans === "E") {
        $('#tablaDeMoviemientosMes').prepend (`<tr id="ingresoRojo">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}</td>
                                  <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                  X
                                </button></td>
                                </tr>`);
      } else {
        $('#tablaDeMoviemientosMes').prepend (`<tr id="ingresoVerde">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}</td>
                                  <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                  X
                                </button></td>
                                </tr>`);
      }
      
      arrayMes.push({
        id: inOutt[index].id,
        inOut: inOutt[index].adddate,
        rubro: inOutt[index].rubro, 
        importe: inOutt[index].importe,
        trans: inOutt[index].trans,
        tipo: inOutt[index].tipo,
      });
      
      
      
    }
//actualizo la barra del mes
let comidaBarra = 0;
let transporteBarra = 0;
let viviendaBarra = 0;
let hobbiesBarra = 0;
let serviciosBarra = 0;
let variosBarra = 0;
  for (let index = 0; index < arrayMes.length; index++) {
    if (arrayMes[index].tipo === "comida") {
      comidaBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "transporte") {
      transporteBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "vivienda") {
      viviendaBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "hobbies") {
      hobbiesBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "servicios") {
      serviciosBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "varios") {
      variosBarra += arrayMes[index].importe;
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
  

 //barras mes
 $('#barComidaMes').css ('width', comidaBarra + "%");

 $('#barTransporteMes').css ('width', transporteBarra + "%");
 
 $('#barViviendaMes').css ('width', viviendaBarra + "%");

 $('#barHobbiesMes').css ('width', hobbiesBarra + "%");

 $('#barServiciosMes').css ('width', serviciosBarra + "%");
 
 $('#barVariosMes').css ('width', variosBarra + "%");
    
  }
};







//calculo la fecha que fue el mes pasado y la pongo en un formato en el que la pueda comparar 
//con la fecha de hoy
const fechaMesPasado = function () {
  const hoy = moment().subtract(1, 'month');

  let mes = hoy.format (('M')); //obteniendo mes
  let dia = hoy.format (('D')); //obteniendo dia
  let ano = hoy.format (('Y')); //obteniendo año

  if (dia < 10) dia = "0" + dia; //agrega cero si la hora menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si los minutos menor de 10
  let fechaMes = ano + "-" + mes + "-" + dia;
  let arrayMes = [];
  

  for (let index = 0; index < inOutt.length; index++) {
    if (inOutt[index].inOut > fechaMes) {
      if (inOutt[index].trans === "E") {
        $('#tablaDeMoviemientosMes').prepend (`<tr id="ingresoRojo">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}</td>
                                  <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                  X
                                </button></td>
                                </tr>`);
      } else {
        $('#tablaDeMoviemientosMes').prepend (`<tr id="ingresoVerde">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}</td>
                                  <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                  X
                                </button></td>
                                </tr>`);
      }
      
      arrayMes.push({
        id: inOutt[index].id,
        inOut: inOutt[index].adddate,
        rubro: inOutt[index].rubro, 
        importe: inOutt[index].importe,
        trans: inOutt[index].trans,
        tipo: inOutt[index].tipo,
      });
      
      
      
    }
//actualizo la barra del mes
let comidaBarra = 0;
let transporteBarra = 0;
let viviendaBarra = 0;
let hobbiesBarra = 0;
let serviciosBarra = 0;
let variosBarra = 0;
  for (let index = 0; index < arrayMes.length; index++) {
    if (arrayMes[index].tipo === "comida") {
      comidaBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "transporte") {
      transporteBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "vivienda") {
      viviendaBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "hobbies") {
      hobbiesBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "servicios") {
      serviciosBarra += arrayMes[index].importe;
    } else if (arrayMes[index].tipo === "varios") {
      variosBarra += arrayMes[index].importe;
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
  

 //barras mes
 $('#barComidaMes').css ('width', comidaBarra + "%");

 $('#barTransporteMes').css ('width', transporteBarra + "%");
 
 $('#barViviendaMes').css ('width', viviendaBarra + "%");

 $('#barHobbiesMes').css ('width', hobbiesBarra + "%");

 $('#barServiciosMes').css ('width', serviciosBarra + "%");
 
 $('#barVariosMes').css ('width', variosBarra + "%");
    
  }
};


//calculo la fecha que fue el año pasado y la pongo en un formato en el que la pueda comparar 
//con la fecha de hoy

const fechaAnioPasado = function () {
  const hoy = moment().subtract(1, 'year');

  let mes = hoy.format (('M')); //obteniendo mes
  let dia = hoy.format (('D')); //obteniendo dia
  let ano = hoy.format (('Y')); //obteniendo año

  if (dia < 10) dia = "0" + dia; //agrega cero si la hora menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si los minutos menor de 10
  let fechaAnio = ano + "-" + mes + "-" + dia;
  let arrayAnio = [];
  

  for (let index = 0; index < inOutt.length; index++) {
    if (inOutt[index].inOut > fechaAnio) {
      if (inOutt[index].trans === "E") {
        $('#tablaDeMoviemientosAnio').prepend (`<tr id="ingresoRojo">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}</td>
                                  <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                  X
                                </button></td>
                                </tr>`);
      } else {
        $('#tablaDeMoviemientosAnio').prepend (`<tr id="ingresoVerde">
                                  <th scope="row" class="hiddDate">${inOutt[index].inOut}</th>
                                  <td>${inOutt[index].rubro}</td>
                                  <td>$ ${inOutt[index].importe}</td>
                                  <td><button type="button" class="btn btn-danger" id="${inOutt[index].id}" onclick="deleteRow(this)">
                                  X
                                </button></td>
                                </tr>`);
      }
      
    }
    arrayAnio.push({
      id: inOutt[index].id,
      inOut: inOutt[index].adddate,
      rubro: inOutt[index].rubro, 
      importe: inOutt[index].importe,
      trans: inOutt[index].trans,
      tipo: inOutt[index].tipo,
    });
    
  }
  let comidaBarra = 0;
let transporteBarra = 0;
let viviendaBarra = 0;
let hobbiesBarra = 0;
let serviciosBarra = 0;
let variosBarra = 0;
  for (let index = 0; index < arrayAnio.length; index++) {
    if (arrayAnio[index].tipo === "comida") {
      comidaBarra += arrayAnio[index].importe;
    } else if (arrayAnio[index].tipo === "transporte") {
      transporteBarra += arrayAnio[index].importe;
    } else if (arrayAnio[index].tipo === "vivienda") {
      viviendaBarra += arrayAnio[index].importe;
    } else if (arrayAnio[index].tipo === "hobbies") {
      hobbiesBarra += arrayAnio[index].importe;
    } else if (arrayAnio[index].tipo === "servicios") {
      serviciosBarra += arrayAnio[index].importe;
    } else if (arrayAnio[index].tipo === "varios") {
      variosBarra += arrayAnio[index].importe;
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
  

 //barras Año
 $('#barComidaAnio').css ('width', comidaBarra + "%");

 $('#barTransporteAnio').css ('width', transporteBarra + "%");
 
 $('#barViviendaAnio').css ('width', viviendaBarra + "%");

 $('#barHobbiesAnio').css ('width', hobbiesBarra + "%");

 $('#barServiciosAnio').css ('width', serviciosBarra + "%");
 
 $('#barVariosAnio').css ('width', variosBarra + "%");
  
};



  
