import { Module } from '@nestjs/common';
import { MaquinasService } from './maquinas.service';
import { MaquinasController } from './maquinas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Maquina, MaquinaSchema } from './maquina.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Maquina.name,
        schema: MaquinaSchema,
      },
    ]),
  ],
  providers: [MaquinasService],
  controllers: [MaquinasController],
})
export class MaquinasModule {}
