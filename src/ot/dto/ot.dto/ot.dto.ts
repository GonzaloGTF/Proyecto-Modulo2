import { IsInt, IsString } from 'class-validator';

export class OtDto {
  @IsString()
  idEmpresa: string;

  @IsInt()
  ot: number;

  @IsInt()
  linea: number;

  @IsString()
  cliente: string;

  @IsString()
  estado: string;

  @IsInt()
  tiempoEstimado: number;

  @IsInt()
  tiempoTotal: number;
}
