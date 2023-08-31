import { IGenerateTokenPayload } from 'src/auth/shared/jsonWebToken';
import * as jwt from 'jsonwebtoken';
import { TokenValidationException } from 'src/shared/exceptions/TokenValidation.exception';

export class JSONWebTokenUtils {
  async generate(payload: IGenerateTokenPayload): Promise<string> {
    return await jwt.sign(payload, process.env.SECRET_KEY);
  }

  async verify(token: string): Promise<IGenerateTokenPayload> {
    try {
      return (await jwt.verify(
        token,
        process.env.SECRET_KEY,
      )) as IGenerateTokenPayload;
    } catch (error) {
      throw new TokenValidationException();
    }
  }
}
