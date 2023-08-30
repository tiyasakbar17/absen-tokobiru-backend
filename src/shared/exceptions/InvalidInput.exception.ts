import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidInputException extends HttpException {
  constructor(errors: Record<string, any>) {
    super(
      { message: 'Invalid Input', errors },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
