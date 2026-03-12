import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const providedKey = req.headers['x-admin-key'];
    const adminSecret = this.configService.get<string>('ADMIN_SECRET');

    if (!adminSecret) {
      throw new UnauthorizedException('Admin secret is not configured.');
    }

    if (!providedKey || providedKey !== adminSecret) {
      throw new UnauthorizedException('Invalid or missing admin key.');
    }

    return true;
  }
}
