import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { EmpresaModule } from '../empresa/empresa.module';
import { LocalStrategy } from './local.strategy';


@Module({
  imports: [EmpresaModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
