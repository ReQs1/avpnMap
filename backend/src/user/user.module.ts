import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
})
export class UserModule {}
