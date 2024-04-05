import { Body, Controller, Delete, Get, ParseBoolPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/auth/guards/is-authenticated.guard';
import { ConvertToArray } from 'src/utils/pipes/convert-to-array.pipe';
import { PositiveIntPipe } from 'src/utils/pipes/positive-int.pipe';
import { CreateQuizDto } from 'src/quiz/dtos/create-quiz.dto';
import { QuizService } from 'src/quiz/services/quiz/quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async returnAllQuizzes(
    @Query('limit', PositiveIntPipe) limit: number,
    @Query('subjectCodes', ConvertToArray) subjectCodes: string[],
    @Query('includeUser', new ParseBoolPipe({ optional: true })) includeUser: boolean,
  ) {
    const quizzes = await this.quizService.returnAll(subjectCodes, limit, includeUser);
    return { quizzes };
  }

  @UseGuards(IsAuthenticatedGuard)
  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto, @Req() req) {
    const quiz = { ...createQuizDto, userId: req.user.username };
    return await this.quizService.createQuiz(quiz);
  }

  @Delete()
  async deleteAll() {
    return await this.quizService.deleteAll();
  }
}
