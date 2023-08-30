import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class RegistrationRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RegistrationResponseDto {
  id: string;
}
