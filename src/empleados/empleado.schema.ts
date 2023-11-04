import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmpleadoDocument = Empleado & Document;

@Schema()
export class Empleado {
  @Prop({ required: true })
  idEmpresa: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  tipoTrabajo: string;

  @Prop({ required: true })
  categoria: string;
}

export const EmpleadoSchema = SchemaFactory.createForClass(Empleado);
