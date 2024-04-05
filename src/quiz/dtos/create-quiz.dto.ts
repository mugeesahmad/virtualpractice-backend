import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsString, Matches } from 'class-validator';

export class CreateQuizDto {
  @IsDefined()
  @IsString()
  question: string;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(4, { message: "'options' must have four string values!" })
  @ArrayMaxSize(4, { message: "'options' must have four string values!" })
  @IsString({ each: true })
  options: string[];

  @IsDefined()
  @IsString()
  correctOption: string;

  @IsDefined()
  @Matches(/^[A-Z]{2,3}[0-9]{3}$/)
  subjectCode: string;
}
