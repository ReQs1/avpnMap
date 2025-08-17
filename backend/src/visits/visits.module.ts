import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [VisitsService],
  controllers: [VisitsController],
  imports: [PrismaModule, AuthModule],
})
export class VisitsModule {}
