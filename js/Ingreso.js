class Ingreso extends Dato{
    static contadorIngresos = 0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id=++Ingreso.contadorIngresos; // Esto para que cada vez que se creen objetos de esta clase se 
        //se lleve un conteo
    }

    get id(){
        return this._id;
    }
}