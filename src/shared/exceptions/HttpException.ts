import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ResponseMessage {
  errors: string[];
}

@Catch(HttpException)
export class ErrorHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      status: 'failed',
      message: exception.message,
      errors: (exception.getResponse() as ResponseMessage).errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
