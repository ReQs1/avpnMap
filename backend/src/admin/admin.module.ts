import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';

@Module({
  imports: [LeaderboardModule],
  controllers: [AdminController],
  providers: [ApiKeyGuard],
})
export class AdminModule {}
