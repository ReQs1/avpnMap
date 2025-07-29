import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OptionalAuthGuard } from 'src/auth/guards/optional-auth/optional-auth.guard';
import { PizzeriasService } from './pizzerias.service';
import { OptionalJwtPayloadRequest } from 'src/auth/interfaces/interfaces';

@Controller('pizzerias')
export class PizzeriasController {
  constructor(private pizzeriasService: PizzeriasService) {}

  @UseGuards(OptionalAuthGuard)
  @Get()
  async getAllPizzerias(@Req() req: OptionalJwtPayloadRequest) {
    const userId = req.user?.sub;
    if (userId) {
      return await this.pizzeriasService.getPizzeriasWithUser(userId);
    }
    return await this.pizzeriasService.getPizzerias();
  }
}
