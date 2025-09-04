import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PizzeriasModule } from './pizzerias/pizzerias.module';
import { VisitsModule } from './visits/visits.module';
import { AchievementsModule } from './achievements/achievements.module';
import { RanksModule } from './ranks/ranks.module';
// import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ThrottlerModule.forRoot({
    //   throttlers: [
    //     {
    //       limit: 200,
    //       ttl: 60000,
    //     },
    //   ],
    // }),
    PrismaModule,
    AuthModule,
    UserModule,
    PizzeriasModule,
    VisitsModule,
    AchievementsModule,
    RanksModule,
  ],
})
export class AppModule {}
