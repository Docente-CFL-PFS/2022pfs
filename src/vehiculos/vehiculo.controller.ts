import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import Vehiculo from './vehiculo';

@Controller('vehiculo')
export class VehiculoController {

    constructor(private vehiculoService : VehiculoService) {}

    @Get()
    public listarVehiculos() : Vehiculo[] {
        return this.vehiculoService.listarTodos();
    }
    @Get('/autos')
    public listarVehiculosAutos() : Vehiculo[] {
        return this.vehiculoService.listarAutos();
    }
    @Get('/camionetas')
    public listarVehiculosCamionetas() : Vehiculo[] {
        return this.vehiculoService.listarCamionetas();
    }
    @Get('/:dominio')
    public listarVehiculo(@Param('dominio') dominio : string) : Vehiculo {
        return this.vehiculoService.listarVehiculo(dominio);
    }

    @Post()
    public agregarVehiculos(@Body() datos : any) : string {
        return this.vehiculoService.agregarVehiculos(datos);
    }
}
