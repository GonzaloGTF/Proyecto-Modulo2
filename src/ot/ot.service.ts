import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ot } from './ot.schema';
import { Model } from 'mongoose';
import { OtModule } from './ot.module';
import { OtDto } from './dto/ot.dto/ot.dto';

@Injectable()
export class OtService {
    constructor(@InjectModel(Ot.name) private otModel: Model<OtService>,) { }

    //coge OTs
    async getOt(idEmpresa): Promise<OtModule[]> {
        return await this.otModel.find({ idEmpresa: idEmpresa });
    }

    //new OT
    async addNewOT(newOT: OtDto): Promise<any> {
        try {
            const { idEmpresa, ot, linea, cliente, tiempoEstimado } = newOT

            if (!ot || !linea || !cliente) {
                throw new BadRequestException("Rellene los campos obligatorios: orden de trabajo, linea y cliente");
            }

            await this.otModel.create({
                idEmpresa: idEmpresa,
                ot: ot,
                linea: linea,
                cliente: cliente,
                estado: "Pendiente",
                tiempoEstimado: tiempoEstimado,
                tiempoTotal: 0
            });
        } catch (e) {
            console.error('Error al añadir la OT:', e);
            throw e
        }
    }

    //Edit estado ot
    async estadoOT(id: string, estado: string): Promise<any> {
        await this.otModel.updateOne({ _id: id }, { $set: { estado: estado } })
        console.log(estado)
        console.log(id)
    }
}
