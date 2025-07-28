import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    id: number;
    username: string;
    email: string;
    avatarURL: string;
  };
}

export interface OptionalUserRequest extends Request {
  user:
    | {
        sub: number;
        iat: number;
        exp: number;
      }
    | undefined;
}
