import { Module } from '@nestjs/common';
import { EmpleadosController } from './empleados.controller';
import { EmpleadosService } from './empleados.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Empleado, EmpleadoSchema } from './empleado.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Empleado.name,
        schema: EmpleadoSchema,
      },
    ]),
  ],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
})
export class EmpleadosModule {}
