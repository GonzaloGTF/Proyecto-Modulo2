import { Body, Controller, Post } from '@nestjs/common';
import { EmpresaService } from './empresa.service';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) { }

  @Post('register')
  async createNewUser(@Body() user: any): Promise<any> {
    await this.empresaService.createNewUser(user);

    return { message: `La empresa ${user.empresa} se ha registrado con exito, ahora inicia sesión` };
  }
}
