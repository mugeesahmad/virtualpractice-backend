import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
