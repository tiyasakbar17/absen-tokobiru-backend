import { db, generateUUID } from 'src/shared/database/db';
import { Users } from '../models/user.entity';
import { NewUserParams } from 'src/auth/shared/createNewUser';
import { RegistrationFailedException } from 'src/auth/exception/registrationFailed.exception';
import { ListObjectUser } from 'src/auth/shared/listObjectUser';
import { AccountNotFoundFailedException } from 'src/auth/exception/accountNotFound.exception';

interface AuthRepository {
  findByKey(key: string): Promise<Users>;
  create(params: NewUserParams): Promise<Users>;
}

export class AuthRepositoryImp implements AuthRepository {
  // Private
  async #checkDataByKey(key: string) {
    const result = await db.exists(`/users/${key}`);
    return result;
  }

  async #getAllData() {
    const allData = await db.getObject<ListObjectUser>('/users');
    return allData;
  }

  //   Public
  async findByKey(key: string) {
    // Check data availibility
    const isExist = await this.#checkDataByKey(key);
    if (!isExist) {
      throw new AccountNotFoundFailedException();
    }
    const result = await db.getObject<Users>(`/users/${key}`);
    return result;
  }

  async create(params: NewUserParams) {
    // Check if the email is registered
    const isExist = await this.#checkDataByKey(params.email);
    if (isExist) {
      throw new RegistrationFailedException();
    }
    const id = generateUUID();
    const newUser: Users = {
      id,
      ...params,
      monthlySummary: {
        alfa: 0,
        attendance: 0,
        leave: 0,
      },
    };
    const oldData = await this.#getAllData();
    await db.push('/users', { ...oldData, [params.email]: newUser });

    return newUser;
  }
}
