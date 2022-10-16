import Vehiculo from "./vehiculo";

export default class UsadosLugar {
    private patente : string;
    private lugar : string;
    private empresa : string;

    constructor(patente: string, lugar : string, empresa : string) {
        this.patente = patente;
        this.lugar=lugar;  
        this.empresa=empresa;    
    }
    
    public getPatente(): string { return this.patente; }
    public getLugar(): string { return this.lugar; }
    public getEmpresa(): string { return this.empresa; }
}