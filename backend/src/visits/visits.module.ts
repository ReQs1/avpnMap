import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { AchievementsModule } from 'src/achievements/achievements.module';

@Module({
  providers: [VisitsService],
  controllers: [VisitsController],
  imports: [PrismaModule, AuthModule, AchievementsModule],
})
export class VisitsModule {}
