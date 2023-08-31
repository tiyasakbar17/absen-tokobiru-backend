import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegistrationUseCase } from '../application/registration/registration.useCase';
import { AuthRepositoryImp } from '../domain/repositories/auth.repository';
import { LoginUseCase } from '../application/login/login.usecase';
import { JSONWebTokenUtils } from '../infrastructure/external/jsonWebtoken';
import { BcryptUtils } from '../infrastructure/external/bcrypt';
import { TokenValidationMiddleware } from 'src/shared/middlewares/tokenValidation';

@Module({
  controllers: [AuthController],
  providers: [
    RegistrationUseCase,
    LoginUseCase,
    AuthRepositoryImp,
    JSONWebTokenUtils,
    BcryptUtils,
    TokenValidationMiddleware,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenValidationMiddleware).forRoutes();
  }
}
