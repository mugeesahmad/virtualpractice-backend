import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Includeable, Op } from 'sequelize';
import { QuizModel } from 'src/quiz/models/quiz.model';
import { UserModel } from 'src/users/models/user.model';

@Injectable()
export class QuizService {
  constructor(@InjectModel(QuizModel) private readonly quizModel: typeof QuizModel) {}

  async returnAll(subjectCodes?: string[], limit?: number, includeUser?: boolean) {
    let where = {};
    if (subjectCodes) {
      where = {
        subjectCode: {
          [Op.in]: subjectCodes,
        },
      };
    }

    const include: Includeable[] = [];
    if (includeUser) {
      include.push({
        model: UserModel,
        attributes: {
          exclude: ['password'],
        },
      });
    }

    return await this.quizModel.findAll({
      where,
      limit,
      include,
    });
  }

  async getAllJobs() {
    const subjectsDB = await this.quizModel.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('subjectCode')), 'subjectCode']],
    });
    const subjects = subjectsDB.map((subject) => {
      return subject.subjectCode;
    });
    return subjects;
  }

  async createQuiz(quiz) {
    return await this.quizModel.create(quiz);
  }

  async deleteAll() {
    return await this.quizModel.destroy({ where: {} });
  }
}
