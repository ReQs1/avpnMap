import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RanksModule } from 'src/ranks/ranks.module';

@Module({
  providers: [AchievementsService],
  exports: [AchievementsService],
  imports: [PrismaModule, RanksModule],
})
export class AchievementsModule {}
