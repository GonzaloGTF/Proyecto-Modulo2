import { IsString } from 'class-validator';

export class MaquinasDto {
  @IsString()
  idEmpresa: string;

  @IsString()
  tipo: string;

  @IsString()
  marca: string;
}
