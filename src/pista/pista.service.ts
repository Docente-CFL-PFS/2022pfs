import { Injectable } from '@nestjs/common';
import * as FS from 'fs';
import Pista from './pista';

@Injectable()
export class PistaService {
    private listaPistas : Pista[] = [];

    constructor() {
        this.loadPistas();
    }

    public getPistas() : Pista[] {
        return this.listaPistas;
    }
    public getPista(identificador : number) : Pista {
        for (let i = 0; i < this.listaPistas.length; i++) {
            if (this.listaPistas[i].getIdentificador() == identificador) 
                return this.listaPistas[i];
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    private loadPistas() {
        let pista : Pista;
        let texto : string = FS.readFileSync('C:\\Cursos\\CFL\\4-BE\\2022pfs\\src\\pista\\pistasMock.txt', 'utf8');
        if (texto) {
            this.listaPistas = [];
            let registros = texto.split('\n');
            for (let i = 0; i < registros.length; i++) {
                let registro = registros[i].split(',');
                pista = new Pista(parseInt(registro[0]), registro[1], parseInt(registro[2]), registro[3])
                this.listaPistas.push(pista);
            }
        }        
    }
}
