import { Users } from '../domain/models/user.entity';

export interface ListObjectUser {
  [key: string]: Users;
}
