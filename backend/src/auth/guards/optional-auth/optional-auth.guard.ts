import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request & { user?: any }>();
    const res = ctx.getResponse<Response>();

    const token = req.cookies?.accessToken;
    if (token) {
      try {
        const payload = this.authService.validateToken(
          token as string,
          'access',
        );
        req.user = payload;
      } catch (err) {
        res.clearCookie('accessToken');
        throw new UnauthorizedException(err);
      }
    }

    return true;
  }
}
