import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OptionalAuthGuard } from 'src/auth/guards/optional-auth/optional-auth.guard';
import { OptionalUserRequest } from 'src/auth/interfaces/interfaces';
import { PizzeriasService } from './pizzerias.service';

@Controller('pizzerias')
export class PizzeriasController {
  constructor(private pizzeriasService: PizzeriasService) {}

  @UseGuards(OptionalAuthGuard)
  @Get()
  async getAllPizzerias(@Req() req: OptionalUserRequest) {
    const userId = req.user?.sub;
    if (userId) {
      return await this.pizzeriasService.getPizzeriasWithUser(userId);
    }
    return await this.pizzeriasService.getPizzerias();
  }
}
