import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const authToken = req.cookies?.accessToken;

    if (!authToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.authService.validateToken(authToken, 'access');
      req.user = payload;
    } catch (error) {
      if (
        typeof error === JsonWebTokenError ||
        typeof error === NotBeforeError
      ) {
        res.clearCookie('accessToken').clearCookie('refreshToken');
      }

      throw new UnauthorizedException(error);
    }

    return true;
  }
}
