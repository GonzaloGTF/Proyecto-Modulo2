import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OtModule } from './ot/ot.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { MaquinasModule } from './maquinas/maquinas.module';
import { EmpresaModule } from './empresa/empresa.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, `..`, `client`) }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/EmpresasMecanizado'),
    OtModule,
    EmpleadosModule,
    MaquinasModule,
    EmpresaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
