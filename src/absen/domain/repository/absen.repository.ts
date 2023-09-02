import { db } from 'src/shared/database/db';
import {
  Absensi,
  TodayAbsen,
  TodayAbsenObj,
} from '../models/absen.entity';
import { AbsenTime } from 'src/absen/constant/enums';

interface AbsenRepository {
  checkDataByKey(key: string): Promise<boolean>;
  create(
    id: string,
    key: string,
    time: AbsenTime,
    payload: Absensi,
  ): Promise<string>;
  getAllUserData(id: string): Promise<Partial<TodayAbsen>[]>;
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

  async getAllUserData(id: string) {
    const finalData: Partial<TodayAbsen>[] = [];
    const rawData = await db.getObject<TodayAbsenObj>(`/absensi/${id}`);
    console.log(rawData);
    for (const key in rawData) {
      if (Object.prototype.hasOwnProperty.call(rawData, key)) {
        const data = rawData[key];
        const [day, month, year] = key.split('.');
        const date = new Date(`${month}.${day}.${year}`).setHours(12);
        finalData.push({ date: new Date(date), ...data });
      }
    }

    return finalData;
  }
}
