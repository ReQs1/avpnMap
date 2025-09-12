import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PizzeriasController } from './pizzerias.controller';
import { PizzeriasService } from './pizzerias.service';
import * as compress from 'compression';

@Module({
  providers: [PizzeriasService],
  controllers: [PizzeriasController],
  imports: [PrismaModule, AuthModule],
})
export class PizzeriasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        compress({
          filter: () => {
            return true;
          },
          threshold: 0,
        }),
      )
      .forRoutes({
        method: RequestMethod.GET,
        path: 'pizzerias',
      });
  }
}
