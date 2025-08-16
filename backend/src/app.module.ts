import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PizzeriasModule } from './pizzerias/pizzerias.module';
import { VisitsModule } from './visits/visits.module';
import { AchievementsModule } from './achievements/achievements.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    PizzeriasModule,
    VisitsModule,
    AchievementsModule,
  ],
})
export class AppModule {}
