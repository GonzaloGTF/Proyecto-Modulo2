import { IsString } from 'class-validator';

export class EmpleadosDto {
  @IsString()
  idEmpresa: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  tipoTrabajo: string;

  @IsString()
  categoria: string;
}
