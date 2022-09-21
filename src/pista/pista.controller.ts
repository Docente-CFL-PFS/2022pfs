import { Controller, Get, Param } from '@nestjs/common';
import { PistaService } from './pista.service';
import Pista from './pista';

@Controller('pista')
export class PistaController {

    constructor(private pistaService : PistaService) {}

    @Get()
    public getPistas() : Pista[] {
        return this.pistaService.getPistas();
    }
    @Get(':identificador')
    public getPista(@Param('identificador') identificador : number) : Pista {
        return this.pistaService.getPista(identificador);
    }
}
