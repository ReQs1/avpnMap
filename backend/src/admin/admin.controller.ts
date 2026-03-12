import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { ApiKeyGuard } from './guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('wake')
  @HttpCode(HttpStatus.OK)
  wake() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Post('leaderboard/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshLeaderboard() {
    await this.leaderboardService.forceRefresh();
    return { status: 'ok', message: 'Leaderboard refreshed successfully.' };
  }
}
