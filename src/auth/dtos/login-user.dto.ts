import { IsDefined, IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @IsDefined()
  @Matches(/^[A-Z][A-Z0-9_]{3,19}/i, {
    message: `'username' must start with an alphabet, atleast have 4 characters, and can only consist of alphabets, numbers and _ (underscore)!`,
  })
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}
