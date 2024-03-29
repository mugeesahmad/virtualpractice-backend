import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    if (request.isAuthenticated()) return true;
    throw new UnauthorizedException(`You are not logged in!`);
  }
}
