import { Injectable } from '@nestjs/common';
import * as FS from 'fs';
import Red from './red';
import Concesionaria from 'src/concesionaria/concesionaria';
import { ConcesionariaService } from 'src/concesionaria/concesionaria.service';

@Injectable()
export class RedService {
    private redes : Red[] = [];
    private concesionariaService : ConcesionariaService;

    constructor() {
        this.concesionariaService = new ConcesionariaService();
        this.loadRedes();
    }

    public listRedes() : Red[] {
        return this.redes;
    }
    public listRed(criterio : string) : Red {
        for (let i = 0; i < this.redes.length; i++) {
            if (this.redes[i].getNombre() == criterio)
                return this.redes[i];            
        }
        return null;
    }
    public addRed(datos : any) : string {
        try {
            let red : Red;
            if (datos)
                if (datos.nombre && datos.url) {
                    for (let i = 0; i < this.redes.length; i++) {
                        if (this.redes[i].getNombre()==datos.nombre) 
                            throw new Error('La red ya se encuentra.')
                    }                    
                    red = new Red(datos.nombre, datos.url);
                    if (datos.concesionarias) {
                        datos.concesionarias.forEach(dato => {
                            let concesionaria : Concesionaria = this.concesionariaService.listConcesionaria(dato.sede);
                            red.addConcesionaria(concesionaria);
                        });
                    }
                    this.redes.push(red);
                    this.saveRedes();
                    this.loadRedes();
                    return "ok";
                }
                else
                    throw new Error('Los datos para crear red no son validos');
            else
                throw new Error('No hay datos para crear red');
        } catch (error) {
            return error.message;            
        }
    }
    public delRed(datos : any) : string {
        try {
            if (datos)
                if (datos.nombre) {
                    for (let i = 0; i < this.redes.length; i++) 
                        if (this.redes[i].getNombre()==datos.nombre) {
                            this.redes.splice(i,1);
                            this.saveRedes();
                            this.loadRedes();
                            return "ok";
                        }
                    throw new Error('La red no se encuentra.')
                }
                else
                    throw new Error('Los datos para eliminar red no son validos');
            else
                throw new Error('No hay datos para eliminar red');
        } catch (error) {
            return error.message;            
        }
    }
    public updRed(datos : any) : string {
        try {
            let red : Red;
            if (datos)
                if (datos.nombre && datos.url) {
                    for (let i = 0; i < this.redes.length; i++) 
                        if (this.redes[i].getNombre()==datos.nombre) {
                            red = new Red(datos.nombre, datos.url);                             
                            if (datos.concesionarias) {
                                datos.concesionarias.forEach(dato => {
                                    let concesionaria : Concesionaria = this.concesionariaService.listConcesionaria(dato.sede);
                                    red.addConcesionaria(concesionaria);
                                });
                            }
                            this.redes[i] = red;
                            this.saveRedes();
                            this.loadRedes();
                            return "ok";
                        }
                    throw new Error('La red no se encuentra.')
                }
                else
                    throw new Error('Los datos para modificar red no son validos');
            else
                throw new Error('No hay datos para modificar red');
        } catch (error) {
            return error.message;            
        }
    }

    //
    private loadRedes() {
        try {
            let red : Red;
            let texto : string = FS.readFileSync('.\\datos\\redesMock.txt', 'utf8');
            if (texto) {
                this.redes=[];
                let registros = texto.split('\n');
                for (let i = 0; i < registros.length; i++) {
                    let registro = registros[i].replace('\r','').split(',');
                    red = new Red(registro[0], registro[1]);
                    let concesionarias = registro[2].split('-');
                    for (let j = 0; j < concesionarias.length; j++) {
                        let concesionaria = this.concesionariaService.listConcesionaria(concesionarias[j]);
                        red.addConcesionaria(concesionaria);                        
                    }
                    this.redes.push(red);
                }
            }        
        } catch (error) {            
        }
    }
    private saveRedes() {
        try {
            FS.writeFileSync('.\\datos\\redesMock.txt', '');
            for (let i = 0; i < this.redes.length; i++) {            
                let registro = this.redes[i].guardar();
                FS.appendFileSync('.\\datos\\redesMock.txt', `${i==0?'':'\n'}${registro}`);
            }
        } catch (error) {           
        }
    }
}
