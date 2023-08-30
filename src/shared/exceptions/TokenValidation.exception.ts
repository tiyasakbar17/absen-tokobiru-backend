import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenValidationException extends HttpException {
  constructor() {
    super('Token is Invalid', HttpStatus.FORBIDDEN);
  }
}
