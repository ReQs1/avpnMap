import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const token = req.cookies?.refreshToken;

    if (!token) throw new UnauthorizedException('Refresh token missing');

    try {
      const payload = this.authService.validateToken(token, 'refresh');
      req.user = payload;
      return true;
    } catch (error) {
      res.clearCookie('accessToken').clearCookie('refreshToken');
      throw new UnauthorizedException(error);
    }
  }
}
