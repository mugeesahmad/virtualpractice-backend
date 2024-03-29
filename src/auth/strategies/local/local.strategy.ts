import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (user === null)
      throw new UnauthorizedException(
        `No user found with the username '${username}'!`,
      );
    if (!user) throw new UnauthorizedException(`Wrong credentials!`);

    return user;
  }
}
