import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MaquinaDocument = Maquina & Document;

@Schema()
export class Maquina {
  @Prop()
  idEmpresa: string;

  @Prop({ required: true })
  tipo: string;

  @Prop()
  marca: string;
}

export const MaquinaSchema = SchemaFactory.createForClass(Maquina);
