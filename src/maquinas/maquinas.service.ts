import { BadRequestException, Injectable } from '@nestjs/common';
import { Maquina } from './maquina.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MaquinasModule } from './maquinas.module';
import { MaquinasDto } from './dto/maquinas.dto/maquinas.dto';

@Injectable()
export class MaquinasService {
    constructor(@InjectModel(Maquina.name) private maquinaModel: Model<MaquinasService>,) { }


    //coge Empleados
    async getMaquinas(idEmpresa): Promise<MaquinasModule[]> {
        return await this.maquinaModel.find({ idEmpresa: idEmpresa });
    }

    //new Maquina
    async addNewMachine(machine: MaquinasDto): Promise<any> {
        try {
            const { idEmpresa, tipo, marca } = machine

            if (!tipo) {
                throw new BadRequestException("Seleccione el tipo de maquina");
            }

            this.maquinaModel.create({
                idEmpresa: idEmpresa,
                tipo: tipo,
                marca: marca,
            });
        } catch (e) {
            console.error('Error al añadir la maquina:', e);
            throw e
        }
    }
}
