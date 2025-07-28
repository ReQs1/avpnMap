import { Controller, Get } from '@nestjs/common';
import { PizzeriasService } from './pizzerias.service';

@Controller('pizzerias')
export class PizzeriasController {
  constructor(private pizzeriasService: PizzeriasService) {}

  @Get()
  async getAllPizzerias() {
    return await this.pizzeriasService.getAllPizzerias();
  }
}
