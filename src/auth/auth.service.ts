import { Injectable } from '@nestjs/common';
import { EmpresaService } from '../empresa/empresa.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly empresaService: EmpresaService) { }

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
}
