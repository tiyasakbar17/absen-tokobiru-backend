import { db } from 'src/shared/database/db';
import { Absensi, UserAbsenObject } from '../models/absen.entity';
import { AbsenTime } from 'src/absen/constant/enums';

interface AbsenRepository {
  checkDataByKey(key: string): Promise<boolean>;
  create(
    id: string,
    key: string,
    time: AbsenTime,
    payload: Absensi,
  ): Promise<string>;
}

export class AbsenRepositoryImpl implements AbsenRepository {
  // Private
  async checkDataByKey(key: string): Promise<boolean> {
    const result = await db.exists(`/absensi/${key}`);
    return result;
  }

  async create(
    id: string,
    key: string,
    time: AbsenTime,
    payload: Absensi,
  ): Promise<string> {
    await db.push(`/absensi/${id}/${key}/${time}`, payload);
    return 'OK';
  }
}
