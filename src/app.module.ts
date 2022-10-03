import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PistaController } from './pista/pista.controller';
import { PistaService } from './pista/pista.service';
import { VehiculoController } from './vehiculos/vehiculo.controller';
import { VehiculoService } from './vehiculos/vehiculo.service';

@Module({
  imports: [ 
    ServeStaticModule.forRoot ( { rootPath : join (__dirname,'..','app') } )
  ],
  controllers: [AppController, PistaController, VehiculoController],
  providers: [AppService, PistaService, VehiculoService],
})
export class AppModule {}
