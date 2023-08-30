import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './shared/exceptions/HttpException';
import { config } from 'dotenv';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { InvalidInputException } from './shared/exceptions/InvalidInput.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessage = errors.map((error) => {
          const constraints = Object.values(error.constraints).join(', ');
          return `${error.property} - ${constraints}`;
        });
        return new InvalidInputException(errorMessage);
      },
    }),
  );
  await app.listen(3000);
}
config();
bootstrap();
