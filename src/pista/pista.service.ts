import { Injectable } from '@nestjs/common';

@Injectable()
export class PistaService {
    private listaPistas = [];
    private static readonly CANTIDAD_PISTAS = 5;

    public getPistas() : any {
        this.listaPistas = [];
        for (let i = 0; i < PistaService.CANTIDAD_PISTAS; i++) {
            let pista = {
                "identificador" : i+1,
                "titulo" : `titulo ${i+1}`,
                "duracion" : Math.floor(Math.random() * 300),
                "interprete" : `interprete ${Math.floor(Math.random() * 3)+1}`
            }
            this.listaPistas.push(pista);
        }
        return this.listaPistas;
    }
}
