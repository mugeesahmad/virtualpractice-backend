import { Controller, Get, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/auth/guards/is-authenticated.guard';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('protected')
  async protected() {
    return 'protected';
  }
}
