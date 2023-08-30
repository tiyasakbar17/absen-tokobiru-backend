import { Injectable } from '@nestjs/common';
import { AuthRepositoryImp } from 'src/auth/domain/repositories/auth.repository';
import { LoginRequestDto, LoginResponseDto } from './login.dto';
import * as bcrypt from 'bcrypt';
import { LoginFailedException } from 'src/auth/exceptions/loginFailed.exception';
import { JSONWebTokenUtils } from 'src/auth/infrastructure/external/jsonWebtoken';
import { BcryptUtils } from 'src/auth/infrastructure/external/bcrypt';
import { Users } from 'src/auth/domain/models/user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: AuthRepositoryImp,
    private readonly bcryptUtils: BcryptUtils,
    private readonly jsonWebTokenUtils: JSONWebTokenUtils,
  ) {}

  async execute(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const calledUser = await this.userRepository.findByKey(
      loginRequestDto.email,
    );
    const isValid = this.bcryptUtils.checkValidPassword(
      loginRequestDto.password,
      calledUser.password,
    );
    if (!isValid) throw new LoginFailedException();
    const token = await this.jsonWebTokenUtils.generate({
      id: calledUser.id,
      email: calledUser.email,
    });

    const userData: Partial<Users> = {
      name: calledUser.name,
      monthlySummary: calledUser.monthlySummary,
    };

    const result: LoginResponseDto = {
      email: calledUser.email,
      token: token,
      userData,
    };
    return result;
  }
}
