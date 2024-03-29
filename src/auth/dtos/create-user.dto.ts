import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @Matches(/^[A-Z][A-Z0-9_]{3,19}/i, {
    message: `'username' must start with an alphabet, atleast have 4 characters, and can only consist of alphabets, numbers and _ (underscore)!`,
  })
  username: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @Matches(/^[A-Za-z ]{4,20}$/)
  fullName: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  majorSubjects: string[];
}
