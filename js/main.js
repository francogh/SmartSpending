const guardarLocal = (clave, valor) =>{
 localStorage.setItem(clave, valor);
};

guardarLocal('movimientos', JSON.stringify(inOutt));



actualizarDinero();



let saldoAcumulado = 0;
barradegastos();
progresoGastos();
fechaMesPasado();
fechaAnioPasado();
fechaya();

$('.pestaniaMes').click(function() {
  $("#tablaDeMoviemientosMes tr").remove();
  fechaMesPasado();
})

$('.pestaniaAnio').click(function() {
  $("#tablaDeMoviemientosAnio tr").remove();
  fechaAnioPasado();

})

$('#btnAgregarDinero').on('click', () => {
  addIn();
    nuevoMovimientoIngreso();
    //agregar el movimiento a la tabla
    $("#tablaDeMoviemientosMes tr").remove();
    $("#tablaDeMoviemientosAnio tr").remove();
    fechaAnioPasado();
    fechaMesPasado();
    barradegastos();
    
})


$('#btnAgregarEgreso').on('click', () => { 
  addOut();
  nuevoMovimientoIngresoSalida();
  $("#tablaDeMoviemientosMes tr").remove();
    $("#tablaDeMoviemientosAnio tr").remove();
    fechaAnioPasado();
    fechaMesPasado();
    barradegastos();
    
})


