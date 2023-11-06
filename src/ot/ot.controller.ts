import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { OtService } from './ot.service';

@Controller('ot')
export class OtController {
    constructor(private readonly otService: OtService) { }

    //ver OTs
    @Get(":idEmpresa")
    getOt(@Param("idEmpresa") idEmpresa: string): any {
        return this.otService.getOt(idEmpresa)
    }

    //Crear nueva OT
    @Post('newOT')
    async addNewOT(@Body() newOT: any): Promise<any> {
        await this.otService.addNewOT(newOT);

        return { message: `Ot añadida` };
    }

    //Modificar estado
    @Put("/estado/:id/:estado")
    estadoOT(@Param("id") id: string, @Param("estado") estado: string): any {
        this.otService.estadoOT(id, estado)

        return ""
    }

    //Search de ot
    @Get(":idEmpresa/:ot")
    searchOt(@Param("idEmpresa") idEmpresa: string, @Param("ot") ot: string): any {
        return this.otService.searchOt(idEmpresa, ot)
    }



    //Modificar tiempo
    // @Put("tiempo/:id/:tiempo")
    // tiempoOT(@Param("id") id: string, @Param("tiempo") tiempo: number): any {
    //     this.otService.tiempoOT(id, tiempo)

    //     return ""
    // }
}
