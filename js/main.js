const guardarLocal = (clave, valor) =>{
 localStorage.setItem(clave, valor);
};

guardarLocal('movimientos', JSON.stringify(inOutt));



actualizarDinero();



let saldoAcumulado = 0;
barradegastos();
progresoGastos();

let botonAgregar = document.getElementById('btnAgregarDinero');
botonAgregar.onclick = () => {
  
    addIn();
    nuevoMovimientoIngreso();
    //agregar el movimiento a la tabla
    
    barradegastos()
    
  
}


let botonQuitar = document.getElementById('btnAgregarEgreso')
botonQuitar.onclick = () => {
  addOut();
  nuevoMovimientoIngresoSalida();
  progresoGastos();
  barradegastos()
}


  






