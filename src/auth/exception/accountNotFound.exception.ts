import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountNotFoundFailedException extends HttpException {
  constructor() {
    super('Account is not found', HttpStatus.NOT_FOUND);
  }
}
