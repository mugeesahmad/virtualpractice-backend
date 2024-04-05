import { ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsOptional, IsString, Matches } from 'class-validator';

enum AccountType {
  student = 'student',
  contributor = 'contributor',
  moderator = 'moderator',
}

export class CreateUserDto {
  @IsDefined()
  @Matches(/^[A-Z][A-Z0-9_]{3,}/i, {
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

  @IsOptional()
  @IsEnum(AccountType)
  accountType: AccountType;
}
