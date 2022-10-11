import Vehiculo from "./vehiculo";

export default class Auto extends Vehiculo {
   
    constructor(dominio: string, precio: number, marca: string, modelo:string, año:number) {
        super(dominio, precio, marca, modelo, año, 'Auto');
    }
    public mostrar() : string {
        return `Auto { Dominio: ${this.dominio} es un ${this.marca}-${this.modelo} modelo ${this.año} con precio ${this.precio.toString()} }`;
    }
    public getTipo() {
        return 'Auto';
    }
    public guardar(): string {
        let datos : string;
        datos = `${super.getDominio()},${super.getPrecio().toString()},${super.getMarca()},${super.getModelo()},${super.getAño().toString()}`;
        return datos;
    }
}