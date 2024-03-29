import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = (await super.canActivate(context)) as boolean;
    if (can) {
      const request = context.switchToHttp().getRequest() as Request;
      await super.logIn(request);
    }
    return true;
  }
}
