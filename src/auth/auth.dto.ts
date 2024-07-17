import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class SignUpDTO {
  @IsNotEmpty()
  @MaxLength(20)
  username: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
