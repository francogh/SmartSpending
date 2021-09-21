const addIn = () => {
  let adddate = prompt("Ingrese una fecha");
  let rubro = prompt("Cual es el concepto del Ingreso?");
  let importe = parseFloat(prompt("Ingrese el monto"));
  inOutt.push({ inOut: adddate, rubro: rubro, importe: importe });
  console.log('REGISTRASTE UN NUEVO INGREO' + '\nFecha: ' + adddate + '\nConcepto: ' + rubro + '\nimporte: ' + importe);
  saldo = saldo + importe;
  console.log('Tu nuevo saldo es de: ' + saldo);
};

const addOut = () => {
    let adddate = prompt("Ingrese una fecha");
    let rubro = prompt("Cual es el concepto del gasto gasto?");
    let importe = parseFloat(prompt("Ingrese el monto"));
    inOutt.push({ inOut: adddate, rubro: rubro, importe: importe });
    console.log('REGISTRASTE UN NUEVO GASTO' + '\nFecha: ' + adddate + '\nConcepto: ' + rubro + '\nimporte: ' + importe);
    saldo = saldo - importe;
    console.log('Tu nuevo saldo es de: ' + saldo);
  };



  
const incomeExpenses = () =>{
  const incomeExpenses = prompt("desea ingresar otro movimiento? \nS para SI/ N para NO");
  return incomeExpenses;

};
const movement = () =>{
  const movementCuestion = prompt("Si es un ingreso coloque I \nSi es un gasto coloque G");
  return movementCuestion;

};
  

 
