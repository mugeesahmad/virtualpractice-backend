import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { IsAuthenticatedGuard } from 'src/auth/guards/is-authenticated.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const alreadyExists = await this.authService.checkIfExists(
      createUserDto.username,
    );
    if (alreadyExists)
      throw new BadRequestException(
        `User with the username '${createUserDto.username}' already exists!`,
      );

    // Hashes the password before saving it into the database
    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password,
    );

    const user = await this.authService.createUser(createUserDto);
    delete user.password;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Req() req) {
    return req.user;
  }

  @UseGuards(IsAuthenticatedGuard)
  @Delete('logout')
  logout(@Req() req: Request) {
    req.logOut((err) => {
      if (err) throw err;
      return 'You have been logged out!';
    });
  }
}
