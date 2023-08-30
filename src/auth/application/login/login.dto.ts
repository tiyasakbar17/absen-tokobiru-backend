import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Users } from 'src/auth/domain/models/user.entity';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  email: string;
  token: string;
  userData: Partial<Users>;
}
