import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtDocument = Ot & Document;

@Schema()
export class Ot {
  @Prop({ required: true })
  idEmpresa: string;

  @Prop({ required: true })
  ot: number;

  @Prop({ required: true })
  linea: number;

  @Prop({ required: true })
  cliente: string;

  @Prop({ required: true })
  estado: string;

  @Prop({})
  tiempoEstimado: number;

  @Prop({ required: true })
  tiempoTotal: number;
}

export const OtSchema = SchemaFactory.createForClass(Ot);
