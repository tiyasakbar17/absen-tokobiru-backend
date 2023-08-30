import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JSONWebTokenUtils } from 'src/auth/infrastructure/external/jsonWebtoken';
import { CustomExpressRequest } from '../interfaces/customExpressRequest';

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  constructor(private readonly jwtUtils: JSONWebTokenUtils) {}

  async use(req: CustomExpressRequest, _res: Response, next: NextFunction) {
    const token = (req.headers['authorization'] as string)?.split('Bearer ')[1];
    const tokenPayload = await this.jwtUtils.verify(token);
    req.tokenPayload = tokenPayload;
    next();
  }
}
