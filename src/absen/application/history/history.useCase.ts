import { Injectable } from '@nestjs/common';
import { TodayAbsen } from 'src/absen/domain/models/absen.entity';
import { AbsenRepositoryImpl } from 'src/absen/domain/repository/absen.repository';

@Injectable()
export class HistoryUseCase {
  constructor(private readonly absenRepository: AbsenRepositoryImpl) {}

  async execute(id: string): Promise<Partial<TodayAbsen>[]> {
    const isExist = await this.absenRepository.checkDataByKey(id);
    if (!isExist) return [];
    return this.absenRepository.getAllUserData(id);
  }
}
