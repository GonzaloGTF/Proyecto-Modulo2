import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmpresaDocument = Empresa & Document;

@Schema()
export class Empresa {
  @Prop({ required: true, unique: true })
  empresa: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;
}

export const EmpresaSchema = SchemaFactory.createForClass(Empresa);
