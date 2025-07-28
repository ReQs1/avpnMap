import { Module } from '@nestjs/common';
import { PizzeriasService } from './pizzerias.service';
import { PizzeriasController } from './pizzerias.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [PizzeriasService],
  controllers: [PizzeriasController],
  imports: [PrismaModule],
})
export class PizzeriasModule {}
