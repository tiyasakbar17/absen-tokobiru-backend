import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginFailedException extends HttpException {
  constructor() {
    super('Login failed', HttpStatus.BAD_REQUEST);
  }
}
