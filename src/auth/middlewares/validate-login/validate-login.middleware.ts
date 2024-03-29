import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { NextFunction } from 'express';
import { LoginUserDto } from '../../dtos/login-user.dto';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const loginSchema = new LoginUserDto();
    const errors = [];
    Object.keys(req.body).forEach((key) => {
      loginSchema[key] = req.body[key];
    });

    try {
      await validateOrReject(loginSchema);
      next();
    } catch (errs) {
      errs.forEach((err) => {
        Object.values(err.constraints).every((constraint) => {
          errors.push(constraint);
          return false;
        });
      });
    }
    if (errors.length) {
      throw new BadRequestException(errors);
    }
  }
}
