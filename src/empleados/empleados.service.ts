import { BadRequestException, Injectable } from '@nestjs/common';
import { Empleado, EmpleadoDocument } from './empleado.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmpleadosDto } from './dto/empleados.dto/empleados.dto';
import { EmpleadosModule } from './empleados.module';

@Injectable()
export class EmpleadosService {
    constructor(@InjectModel(Empleado.name) private empleadoModel: Model<EmpleadoDocument>,) { }

    //coge Empleados
    async getEmpleados(idEmpresa): Promise<EmpleadosModule[]> {
        return await this.empleadoModel.find({ idEmpresa: idEmpresa });
    }


    //new Employee
    async createNewEmployee(employee: EmpleadosDto): Promise<any> {
        try {
            const { idEmpresa, nombre, apellido, tipoTrabajo, categoria } = employee

            if (!nombre || !apellido || !tipoTrabajo || !categoria) {
                throw new BadRequestException("Rellene todos los apartados");
            }
            this.empleadoModel.create({
                idEmpresa: idEmpresa,
                nombre: nombre,
                apellido: apellido,
                tipoTrabajo: tipoTrabajo,
                categoria: categoria
            });
        } catch (e) {
            console.error('Error al añadir empleado:', e);
            throw e
        }
    }


    //Despedir empleado
    async deleteEmpleado(empleadoId: string): Promise<any> {

        return this.empleadoModel.deleteOne({ _id: empleadoId })
    }
}
