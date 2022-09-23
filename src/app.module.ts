import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PistaController } from './pista/pista.controller';
import { PistaService } from './pista/pista.service';
import { DiscograficaController } from './discografica/discografica.controller';
import { DiscograficaService } from './discografica/discografica.service';

@Module({
  imports: [ 
    ServeStaticModule.forRoot ( { rootPath : join (__dirname,'..','app') } )
  ],
  controllers: [AppController, PistaController, DiscograficaController],
  providers: [AppService, PistaService, DiscograficaService],
})
export class AppModule {}
