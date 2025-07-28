import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PizzeriasService {
  constructor(private prisma: PrismaService) {}
  async getAllPizzerias() {
    return await this.prisma.pizzeria.findMany();
  }
}
