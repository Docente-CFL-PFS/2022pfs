import { Injectable } from '@nestjs/common';

@Injectable()
export class PistaService {
    private listaPistas = [];

    public getPistas() : any {
        this.listaPistas = [
            { "identificador" : 1, "titulo" : "Bohemian Rhapsody", "duracion" : 481, "interprete" : "Queen" },
            { "identificador" : 2, "titulo" : "Imagine", "duracion" : 290, "interprete" : "John Lennon" },
            { "identificador" : 3, "titulo" : "Satisfaction", "duracion" : 308, "interprete" : "The Rolling Stones" },
            { "identificador" : 4, "titulo" : "HighWay to Hell", "duracion" : 241, "interprete" : "AC/DC" },
            { "identificador" : 5, "titulo" : "November Rain", "duracion" : 255, "interprete" : "Guns & Roses" },
            { "identificador" : 6, "titulo" : "Jaded", "duracion" : 255, "interprete" : "Aerosmith" },
            { "identificador" : 7, "titulo" : "I Was Made for Lovin' You", "duracion" : 268, "interprete" : "Kiss" }
        ];
        return this.listaPistas;
    }
}
