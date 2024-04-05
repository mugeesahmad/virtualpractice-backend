import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { QuizModel } from 'src/quiz/models/quiz.model';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @Column({
    unique: true,
    primaryKey: true,
  })
  username: string;

  @Column
  password: string;

  @Column
  fullName: string;

  @Column({
    type: DataType.ENUM('student', 'contributor', 'moderator'),
    defaultValue: 'student',
  })
  accountType: 'student' | 'contributor' | 'moderator';

  @Column({ type: DataType.JSON })
  majorSubjects: string[];

  @HasMany(() => QuizModel)
  quizzes: QuizModel[];
}
