

        // FECHA DEL DIA
            window.onload = function(){
            var fecha = new Date(); //Fecha actual
            var mes = fecha.getMonth()+1; //obteniendo mes
            var dia = fecha.getDate(); //obteniendo dia
            var ano = fecha.getFullYear(); //obteniendo año
            
            if(dia<10)
              dia='0'+dia; //agrega cero si la hora menor de 10
            if(mes<10)
              mes='0'+mes //agrega cero si los minutos menor de 10
            document.getElementById('fechaActual').value=ano+"-"+mes+"-"+dia;
    
            
            
          }