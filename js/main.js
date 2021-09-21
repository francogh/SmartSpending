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

let inOutt = [
  { inOut: "10/10/21", rubro: "Colectivo", importe: 100 },
  { inOut: "14/12/21", rubro: "Alquiler", importe: 300 },
  { inOut: "12/02/21", rubro: "Nafta", importe: 1220 },
  { inOut: "22/06/21", rubro: "Supermercado", importe: 101 },
  { inOut: "28/12/21", rubro: "Herramienta", importe: 1002 },
  { inOut: "02/09/21", rubro: "Perfume", importe: 1992 },
  { inOut: "01/10/21", rubro: "Remera", importe: 10113 },
];

const salida = inOutt.filter((anm) => {
  return anm.rubro !== "Remera";
});

let saldo = parseInt(prompt("Ingrese su sado inicial"));
console.log(saldo);
let cuestion = prompt("Desea ingresar un mivimiento? \nS para SI / N para NO");

if (cuestion === "S" || cuestion === "s") {
  do {
    var moveme = movement();

    if (moveme === "i" || moveme === "I") {
      addIn();
    } else if (moveme === "g" || moveme === "G") {
      addOut();
    } else {
      alert("No es una opcion valida!");
    }
    income = incomeExpenses();

  } while (income === "S" || income === "s");
  console.log("Gracias por utilizar Smart Spending");
} else {
  alert("Gracias por utilizar Smart Spending");
}
