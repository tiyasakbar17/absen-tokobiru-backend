import { HttpException, HttpStatus } from '@nestjs/common';

export class RegistrationFailedException extends HttpException {
  constructor() {
    super('User already registered', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
