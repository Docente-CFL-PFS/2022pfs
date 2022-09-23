import { Injectable } from '@nestjs/common';

@Injectable()
export class PistaService {
    private listaPistas = [];

    public getPistas() : any {
        this.listaPistas = [
            { "identificador" : 1, "titulo" : "Bohemian Rhapsody", "duracion" : 481, "interprete" : "Queen", "año" : 1975 },
            { "identificador" : 2, "titulo" : "Imagine", "duracion" : 290, "interprete" : "John Lennon", "año" : 1971 },
            { "identificador" : 3, "titulo" : "Satisfaction", "duracion" : 308, "interprete" : "The Rolling Stones", "año" : 1965 },
            { "identificador" : 4, "titulo" : "HighWay to Hell", "duracion" : 241, "interprete" : "AC/DC", "año" : 1979 },
            { "identificador" : 5, "titulo" : "November Rain", "duracion" : 255, "interprete" : "Guns & Roses", "año" : 1991 },
            { "identificador" : 6, "titulo" : "Jaded", "duracion" : 255, "interprete" : "Aerosmith", "año" : 2001 },
            { "identificador" : 7, "titulo" : "I Was Made for Lovin' You", "duracion" : 268, "interprete" : "Kiss", "año" : 1979 }
        ];
        return this.listaPistas;
    }
}
