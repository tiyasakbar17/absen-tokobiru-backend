import { HttpException, HttpStatus } from '@nestjs/common';

export class DistanceTooFarException extends HttpException {
  constructor() {
    super('You need to absen near by the location', HttpStatus.NOT_ACCEPTABLE);
  }
}
