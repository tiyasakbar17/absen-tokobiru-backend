import { Request } from 'express';
import { IGenerateTokenPayload } from 'src/auth/shared/jsonWebToken';

export interface CustomExpressRequest extends Request {
  tokenPayload?: IGenerateTokenPayload;
}
