import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { ApiKeyGuard } from './guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('wake')
  @HttpCode(HttpStatus.OK)
  wake() {
    this.logger.log('Wake up route hit');
    return 'ok';
  }

  @Post('leaderboard/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshLeaderboard() {
    await this.leaderboardService.forceRefresh();
    return 'ok';
  }
}
