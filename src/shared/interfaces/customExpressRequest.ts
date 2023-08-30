import { Request } from 'express';
import { IGenerateTokenPayload } from 'src/auth/interface/jsonWebToken';

export interface CustomExpressRequest extends Request {
  tokenPayload?: IGenerateTokenPayload;
}
