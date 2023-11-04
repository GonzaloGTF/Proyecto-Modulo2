import { HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Empresa, EmpresaDocument } from './empresa.schema';
import { Model } from 'mongoose';
import { EmpresaDto } from './dto/empresa.dto/empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(@InjectModel(Empresa.name) private empresaModel: Model<EmpresaDocument>,) { }

  //new User + hashedPassword
  async createNewUser(user: EmpresaDto): Promise<any> {
    try {
      const { empresa, password, email } = user;

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(empresa, hashedPassword, email)
      if (!empresa || !hashedPassword || !email) {
        throw new BadRequestException("Rellene todos los datos");
      }

      await this.empresaModel.create({
        empresa: empresa,
        password: hashedPassword,
        email: email
      });

    } catch (error) {
      console.error('Error al crear el usuario:', error);
      if (error.name === "MongoServerError" && error.code === 11000) {
        throw new BadRequestException("Nombre de la empresa ya existe")
      } else {
        throw new BadRequestException('Rellene todos los datos')
      }
    }
  }

  //Find empresa (para login)
  async findOne(empresa: string): Promise<any | undefined> {
    let user = await this.empresaModel.findOne({ empresa: empresa });

    return user;
  }
}
