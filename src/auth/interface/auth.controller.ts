import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RegistrationUseCase } from '../application/registration/registration.useCase';
import {
  RegistrationRequestDto,
  RegistrationResponseDto,
} from '../application/registration/registration.dto';
import { ResponseDtoUtils } from 'src/shared/utis/response.utils';
import { ResponseDto } from 'src/shared/dtos/response.dto';
import { LoginUseCase } from '../application/login/login.usecase';
import {
  LoginRequestDto,
  LoginResponseDto,
} from '../application/login/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registrationUseCase: RegistrationUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  // @UseInterceptors(NoFilesInterceptor()) // Cara untuk handle form-data
  async registerUser(
    @Body() registrationDto: RegistrationRequestDto,
  ): Promise<ResponseDto<RegistrationResponseDto>> {
    const results = await this.registrationUseCase.execute(registrationDto);
    const response: RegistrationResponseDto = {
      id: results.id,
    };
    return ResponseDtoUtils.success<RegistrationResponseDto>(
      'Registered successfully',
      response,
      HttpStatus.CREATED,
    );
  }

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginRequestDto,
  ): Promise<ResponseDto<LoginResponseDto>> {
    const response = await this.loginUseCase.execute(loginDto);
    return ResponseDtoUtils.success<LoginResponseDto>(
      'Login success',
      response,
    );
  }
}
