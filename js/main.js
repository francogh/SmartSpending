const guardarLocal = (clave, valor) =>{
 localStorage.setItem(clave, valor);
};

guardarLocal('movimientos', JSON.stringify(inOutt));



actualizarDinero();



let saldoAcumulado = 0;
barradegastos();
progresoGastos();



$('#btnAgregarDinero').on('click', () => {
  addIn();
    nuevoMovimientoIngreso();
    //agregar el movimiento a la tabla
    
    barradegastos()
})


$('#btnAgregarEgreso').on('click', () => { 
  addOut();
  nuevoMovimientoIngresoSalida();
  progresoGastos();
  barradegastos()
})



  //
// $("#animacionesCombinadas").prepend('<button id="btn1">Arriba</button>');+
// $("#animacionesCombinadas").prepend('<button id="btn2">Abajo</button>');
// $("#animacionesCombinadas").prepend('<button id="btn3">Arriba/Abajo</button>');
// $("#animacionesCombinadas").prepend('<div style="background-color: yellow; height: 50vh; width: 100%" id="div"></div>')

// $('#btn1').click(() => {
//     $('#div').slideUp('slow');
// })

// $('#btn2').click(() => {
//     $('#div').slideDown('slow');
// })

// $('#btn3').click(() => {
//     $('#div').toggle('slow');
// })



