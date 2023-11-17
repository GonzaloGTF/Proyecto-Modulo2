import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmpresaService } from '../empresa/empresa.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly empresaService: EmpresaService, readonly authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user)
    }

    // async login(@Body() body: any): Promise<any> {
    //     const user = await this.empresaService.findOne(body.empresa);
    //     return user;
    // }


} 
