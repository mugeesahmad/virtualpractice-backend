import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user.username);
  }

  async deserializeUser(
    payload: string,
    done: (err: Error, user: any) => void,
  ) {
    const user = await this.usersService.findOne(payload);
    delete user.password;
    done(null, user);
  }
}
