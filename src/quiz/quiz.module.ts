import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz/quiz.controller';
import { QuizService } from './services/quiz/quiz.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuizModel } from './models/quiz.model';

@Module({
  imports: [SequelizeModule.forFeature([QuizModel])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
