import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QuizModel } from 'src/quiz/models/quiz.model';
import { UserModel } from 'src/users/models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private readonly userModel: typeof UserModel) {}

  async getAllUsers() {
    return await this.userModel.findAll({ include: { model: QuizModel } });
  }

  async checkIfUserExists(username: string) {
    const user = await this.userModel.findByPk(username);
    return !!user;
  }

  async createUser(userObject): Promise<UserModel> {
    try {
      const user = await this.userModel.create(userObject);
      return user.dataValues;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(username: string) {
    const user = await this.userModel.findByPk(username);
    return user?.dataValues;
  }
}
