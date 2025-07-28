import { Module } from '@nestjs/common';
import { PizzeriasService } from './pizzerias.service';
import { PizzeriasController } from './pizzerias.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PizzeriasService],
  controllers: [PizzeriasController],
  imports: [PrismaModule, AuthModule],
})
export class PizzeriasModule {}
