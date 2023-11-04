import { IsString } from 'class-validator';

export class EmpresaDto {
  @IsString()
  empresa: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}
