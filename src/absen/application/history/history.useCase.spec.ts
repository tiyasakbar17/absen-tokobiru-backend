import {
  AbsenRepository,
  AbsenRepositoryImpl,
} from 'src/absen/domain/repository/absen.repository';
import { HistoryUseCase } from './history.useCase';
import { TodayAbsen } from 'src/absen/domain/models/absen.entity';
import { AbsenStatus } from 'src/absen/constant/enums';

describe('History Usecase', () => {
  let historyUseCase: HistoryUseCase;
  let absenRepository: AbsenRepository;

  beforeEach(() => {
    absenRepository = new AbsenRepositoryImpl();
    historyUseCase = new HistoryUseCase(absenRepository);
  });

  describe('Success', () => {
    it('Data is < 1', async () => {
      jest
        .spyOn(absenRepository, 'checkDataByKey')
        .mockImplementationOnce(() => Promise.resolve(false));

      const result = await historyUseCase.execute('tiyas ganteng');
      expect(result).toEqual([]);
    });

    it('Data is > 1', async () => {
      const mockResult: Partial<TodayAbsen>[] = [
        {
          date: new Date(),
          in: {
            details: 'tiyas ganteng',
            location: {
              lat: 123,
              lon: 13,
            },
            status: AbsenStatus.ONTIME,
            time: '8:00',
          },
          out: {
            details: 'tiyas ganteng',
            location: {
              lat: 123,
              lon: 13,
            },
            status: AbsenStatus.ONTIME,
            time: '8:00',
          },
        },
      ];
      jest
        .spyOn(absenRepository, 'checkDataByKey')
        .mockImplementationOnce(() => Promise.resolve(true));
      jest
        .spyOn(absenRepository, 'getAllUserData')
        .mockImplementationOnce(() => Promise.resolve(mockResult));

      const result = await historyUseCase.execute('tiyas ganteng');
      expect(result).toEqual(mockResult);
    });
  });
});
