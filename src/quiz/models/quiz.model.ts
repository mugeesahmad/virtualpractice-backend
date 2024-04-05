import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { generateRandomString } from 'randomstring-tool';
import { UserModel } from 'src/users/models/user.model';

@Table({ tableName: 'quiz' })
export class QuizModel extends Model {
  @Column({
    type: DataType.CHAR(8),
    primaryKey: true,
    unique: true,
    defaultValue: () => generateRandomString(8),
  })
  quiz_id: string;

  @Column({ type: DataType.CHAR(6) })
  subjectCode: string;

  @Column({ type: DataType.TEXT })
  question: string;

  @Column({ type: DataType.JSON })
  options: string[];

  @Column({ type: DataType.TEXT })
  correctOption: string;

  @ForeignKey(() => UserModel)
  @Column
  userId: string;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
