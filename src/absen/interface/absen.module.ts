import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AbsenController } from './absen.controller';
import { TokenValidationMiddleware } from 'src/shared/middlewares/tokenValidation';
import { protectedRoutes } from '../constant/routes';
import { AbsenRepositoryImpl } from '../domain/repository/absen.repository';
import { AbsenUseCase } from '../application/absen/absen.useCase';
import { JSONWebTokenUtils } from 'src/auth/infrastructure/external/jsonWebtoken';

@Module({
  controllers: [AbsenController],
  providers: [
    TokenValidationMiddleware,
    AbsenRepositoryImpl,
    AbsenUseCase,
    JSONWebTokenUtils,
  ],
})
export class AbsenModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenValidationMiddleware).forRoutes(...protectedRoutes);
  }
}
