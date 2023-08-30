import * as bcrypt from 'bcrypt';

export class BcryptUtils {
  generateHashedPassword(passsword: string): string {
    return bcrypt.hashSync(passsword, 10);
  }
  checkValidPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
