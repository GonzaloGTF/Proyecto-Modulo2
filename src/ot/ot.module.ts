import { Module } from '@nestjs/common';
import { OtController } from './ot.controller';
import { OtService } from './ot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ot, OtSchema } from './ot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ot.name,
        schema: OtSchema,
      },
    ]),
  ],
  controllers: [OtController],
  providers: [OtService],
})
export class OtModule {}
