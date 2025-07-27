import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateGoogleUser(googleUser: Prisma.UserCreateInput) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;

    return await this.userService.create(googleUser);
  }
}
