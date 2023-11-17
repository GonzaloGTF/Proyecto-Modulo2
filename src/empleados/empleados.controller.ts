import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { JwtAuthGuard } from 'src/auth/local-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('empleados')
export class EmpleadosController {
    constructor(private readonly empleadoService: EmpleadosService) { }

    //ver Empleados
    @Get(":idEmpresa")
    getOt(@Param("idEmpresa") idEmpresa: string): any {
        return this.empleadoService.getEmpleados(idEmpresa)
    }

    //Contratar Empleado
    @Post('newEmployee')
    async createNewUser(@Body() employee: any): Promise<any> {
        await this.empleadoService.createNewEmployee(employee);

        return { message: `Nuevo empleado` };
    }

    //Despedir Empleado
    @Delete("despedir/:realId")
    async deleteEmpleado(@Param("realId") empleadoId: string): Promise<any> {
        await this.empleadoService.deleteEmpleado(empleadoId)
        return "Empleado despedido"
    }
}
