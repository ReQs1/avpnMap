import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AchievementsService],
  exports: [AchievementsService],
  imports: [PrismaModule],
})
export class AchievementsModule {}
