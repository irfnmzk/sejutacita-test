import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
