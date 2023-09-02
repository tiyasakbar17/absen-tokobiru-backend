import { TodayAbsen } from 'src/absen/domain/models/absen.entity';

export class HistoryResponseDto {
  histories: Partial<TodayAbsen>[];
}
