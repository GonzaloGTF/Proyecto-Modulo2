import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmpresaService } from '../empresa/empresa.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly empresaService: EmpresaService) { }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() body: any): Promise<any> {
        const user = await this.empresaService.findOne(body.empresa);
        return user;
    }

} 
