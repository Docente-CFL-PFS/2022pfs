export default abstract class Vehiculo {
    protected dominio: string;
    protected marca: string;
    protected modelo: string;
    protected año: number;
    protected precio: number;
    protected tipo: string;

    constructor(dominio: string, precio: number, marca: string, modelo: string, año: number, tipo: string) {
        this.dominio=dominio;
        this.precio=precio;
        this.marca=marca;
        this.modelo=modelo;
        this.año=año;
        this.tipo=tipo;
    }

    public getDominio(): string { return this.dominio; }
    public setDominio(dominio: string): void { this.dominio = dominio; }

    public getPrecio(): number { return this.precio; }
    public setPrecio(precio: number): void { this.precio = precio; }

    public getMarca(): string { return this.marca; }
    public setMarca(marca: string): void { this.marca = marca; }

    public getModelo(): string { return this.modelo; }
    public setModelo(modelo: string): void { this.modelo = modelo; }

    public getAñO(): number { return this.año; }
    public setAñO(año: number): void { this.año = año; }

    abstract getTipo(): string;
    abstract mostrar(): string;
    abstract guardar(): string;
}