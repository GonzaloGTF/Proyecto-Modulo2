import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MaquinasService } from './maquinas.service';

@Controller('maquinas')
export class MaquinasController {
    constructor(private readonly maquinasService: MaquinasService) { }

    //ver Maquinas
    @Get(":idEmpresa")
    getOt(@Param("idEmpresa") idEmpresa: string): any {
        return this.maquinasService.getMaquinas(idEmpresa)
    }

    //Añadir nueva Maquina
    @Post('newMachine')
    async createNewMaquina(@Body() machine: any): Promise<any> {
        await this.maquinasService.addNewMachine(machine);

        return { message: `Maquina añadida` };
    }

    //Eliminar maquina
    @Delete("eliminar/:realId")
    async deleteMaquina(@Param("realId") maquinaId: string): Promise<any> {
        await this.maquinasService.deleteMaquina(maquinaId)
        return "Maquina eliminada"
    }
}
