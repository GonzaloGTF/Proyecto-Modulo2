import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Empresa, EmpresaSchema } from './empresa.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Empresa.name,
        schema: EmpresaSchema,
      },
    ]),
  ],
  controllers: [EmpresaController],
  providers: [EmpresaService],
  exports: [EmpresaService]
})
export class EmpresaModule { }
