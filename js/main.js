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



$('#btnAgregarDinero').on('click', () => {
  addIn();
    nuevoMovimientoIngreso();
    //agregar el movimiento a la tabla
    
    barradegastos()
})


$('#btnAgregarEgreso').on('click', () => { 
  addOut();
  nuevoMovimientoIngresoSalida();
    barradegastos()
})


