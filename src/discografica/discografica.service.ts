import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscograficaService {
    private listaDiscograficas = [];

    public getDiscograficas() : any {
        this.listaDiscograficas = [
            { "nombre" : "Emi Records", "sede" : "4 Pancras Sq, London N1C 4PW, Reino Unido", "ceo" : "", "año" : 1972 },
            { "nombre" : "Capitol Records", "sede" : "Capitol Records Tower - Los Angeles, California 90046", "ceo" : "Jhonny Mercer", "año" : 1942 },
            { "nombre" : "London Records", "sede" : "", "ceo" : "Edward Lewis", "año" : 1947 },
            { "nombre" : "Atlantic Records", "sede" : "1841 Broadway - Nueva York, NY 1002", "ceo" : "Herb Abramson", "año" : 1947 },
            { "nombre" : "Columbia Records", "sede" : "550 Madison Ave - Nueva York, NY 1002", "ceo" : "Rob Stringer", "año" : 1887 },
            { "nombre" : "Casablanca Record And Filmworks", "sede" : "8255 Sunset Boulevard - Los Angeles, California 90046", "ceo" : "Neil Bogart", "año" : 1976 }
        ];
        return this.listaDiscograficas;
    }
}
