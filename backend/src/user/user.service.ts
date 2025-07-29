import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async fetchUserInfo(userId: number) {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }
}
