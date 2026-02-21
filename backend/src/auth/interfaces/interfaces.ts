import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    id: number;
    firstName: string;
    email: string;
    avatarURL: string;
  };
}

export interface OptionalJwtPayloadRequest extends Request {
  user:
    | {
        sub: number;
        iat: number;
        exp: number;
      }
    | undefined;
}

export interface JwtPayloadRequest extends Request {
  user: {
    sub: number;
    iat: number;
    exp: number;
  };
}
