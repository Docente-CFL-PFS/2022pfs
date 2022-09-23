import { Controller, Get } from '@nestjs/common';
import { DiscograficaService } from './discografica.service';

@Controller('discografica')
export class DiscograficaController {

    constructor(private discograficaService : DiscograficaService) {}

    @Get()
    public getDiscografica() : any {
        return this.discograficaService.getDiscograficas();
    }
}
