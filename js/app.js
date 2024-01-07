const ingresos = [
  //Lo que es constante es la referencia al arreglo pero los elementos dentro de este si pueden
  //modificarse, lo que no puede modificarse es la referencia.
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta coche", 1500),
];

const egresos = [
  new Egreso("Renta departamento", 900),
  new Egreso("Ropa", 400),
];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }); //Se puede utilizar otro idioma como en-GB, es-MX, es-Arg, pero como se
  //se quiere dejar standard se deja en en-US. Dependiendo de que coloquemos en el segundo item sera el tipo de
  //moneda que se usara
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngresos = () => {
  let ingresosHTML = "";

  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }

  

  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${ingreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="trash" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
            
    `;
  return ingresoHTML;
};

const cargarEgresos = () => {
  let egresosHTML = "";
  
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
    
  }
  
 

  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
    
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${egreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
                    <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="trash" onclick='eliminarEgreso(${Egreso.id})'></ion-icon>
                        </button>
                    </div>
                </div>
            </div>

    `;

    console.log();
    
  return egresoHTML;
};

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso=> ingresos.id === id);//proporcionamos el id que estamos buscando
    //a traves de una funcion flecha acedemos a los id que arroja el recorrido del arreglo ingresos y si es 
    //igual a el id que suministramos a traves del metodo findIndex devolvemos ese valor y lo asignamos a una
    // variable para poder trabajar todo a traves de esta.

    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();

    //for(let ingreso of ingresos)
}

const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egresos.id === id);//proporcionamos el id que estamos buscando
    //a traves de una funcion flecha acedemos a los id que arroja el recorrido del arreglo egresos y si es 
    //igual a el id que suministramos a traves del metodo findIndex devolvemos ese valor y lo asignamos a una
    // variable para poder trabajar todo a traves de esta.

    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();

    //for(let ingreso of ingresos)
}

let agregarDato = () =>{
    let forma = document.forms['forma']; //asignamos una variable para recuperar el formulario 
    //a traves del id forma
    let tipo = forma['tipo'];//asignamos una variable para recuperar el tipo select (ingreso/egreso) 
    //a traves del id tipo y se lo solicitamos a la forma
    let descripcion = forma['descripcion']; //de igual manera pero con el id descripcion.
    let valor = forma['valor']; // de igual manera pero con el id valor.

    if(descripcion.value !==''&& valor.value !=='' ){
        if(tipo.value==='ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));//con el + hacemos que si lo que esta
            //dentro de este valor es un valor numerico en forma de string se convierta a numerico y si ya lo
            //no afecta en nada, esto tambien se puede hacer a traves de la funcion "Number()".
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value==='egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));//con el + hacemos que si lo que esta
            //dentro de este valor es un valor numerico en forma de string se convierta a numerico y si ya lo
            //no afecta en nada, esto tambien se puede hacer a traves de la funcion "Number()".
            cargarCabecero();
            cargarEgresos();
        }
    }
}