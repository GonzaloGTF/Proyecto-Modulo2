import { Injectable } from '@nestjs/common';
import { EmpresaService } from '../empresa/empresa.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private readonly empresaService: EmpresaService, private jwtService: JwtService) { }

    //validar user+passhashed
    async validateUser(empresa: string, password: string): Promise<any> {
        const user = await this.empresaService.findOne(empresa);
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                const { password, ...result } = user;

                return result;
            }
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.empresa, id: user._id }

        const findUser = await this.empresaService.findOne(payload.username);

        //para que te traiga el user junto al token
        return {
            user: findUser,
            access_token: this.jwtService.sign(payload)
        }
    }
}
