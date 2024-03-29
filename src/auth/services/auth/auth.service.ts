import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (!user) return null;

    const isMatch = await this.comparePasswords(password, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    }

    return false;
  }

  async createUser(userObject) {
    const user = await this.usersService.createUser(userObject);
    return user;
  }
  async checkIfExists(username: string) {
    return await this.usersService.checkIfUserExists(username);
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  async comparePasswords(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}
