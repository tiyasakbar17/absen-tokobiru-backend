import { AbsenRepositoryImpl } from 'src/absen/domain/repository/absen.repository';
import { AbsenUseCase } from './absen.useCase';
import { AbsenRequestDto } from './absen.dto';
import { AbsenStatus } from 'src/absen/constant/enums';
import { DistanceTooFarException } from 'src/absen/exceptions/tooFarFromOffice.exception';

describe('Absen Usecase', () => {
  let absenUseCase: AbsenUseCase;
  let absenRepository: AbsenRepositoryImpl;

  beforeEach(() => {
    absenRepository = new AbsenRepositoryImpl();
    absenUseCase = new AbsenUseCase(absenRepository);
  });
  describe('Success', () => {
    it('Is a check in absen on time', async () => {
      jest
        .spyOn(absenRepository, 'checkDataByKey')
        .mockImplementationOnce(() => Promise.resolve(false));
      jest
        .spyOn(absenRepository, 'create')
        .mockImplementationOnce(() => Promise.resolve('OK'));
      const absenTime = new Date();
      absenTime.setHours(7);
      absenTime.setMinutes(59);
      const request: AbsenRequestDto = {
        absenTime,
        details: 'tiyas ganteng',
        location: {
          lat: -6.184899,
          lon: 106.83108,
        },
      };
      const status = await absenUseCase.execute('tiyas ganteng', request);

      expect(status).toBe(AbsenStatus.ONTIME);
    });

    it('Is a check in absen late', async () => {
      jest
        .spyOn(absenRepository, 'checkDataByKey')
        .mockImplementationOnce(() => Promise.resolve(false));
      jest
        .spyOn(absenRepository, 'create')
        .mockImplementationOnce(() => Promise.resolve('OK'));
      const absenTime = new Date();
      absenTime.setHours(8);
      absenTime.setMinutes(1);
      const request: AbsenRequestDto = {
        absenTime,
        details: 'tiyas ganteng',
        location: {
          lat: -6.184899,
          lon: 106.83108,
        },
      };
      const status = await absenUseCase.execute('tiyas ganteng', request);

      expect(status).toBe(AbsenStatus.LATE);
    });

    it('Is a check out absen early', async () => {
      jest
        .spyOn(absenRepository, 'checkDataByKey')
        .mockImplementationOnce(() => Promise.resolve(true));
      jest
        .spyOn(absenRepository, 'create')
        .mockImplementationOnce(() => Promise.resolve('OK'));
      const absenTime = new Date();
      absenTime.setHours(16);
      absenTime.setMinutes(59);
      const request: AbsenRequestDto = {
        absenTime,
        details: 'tiyas ganteng',
        location: {
          lat: -6.184899,
          lon: 106.83108,
        },
      };
      const status = await absenUseCase.execute('tiyas ganteng', request);

      expect(status).toBe(AbsenStatus.EARLY);
    });

    it('Is a check out absen On Time', async () => {
      jest
        .spyOn(absenRepository, 'checkDataByKey')
        .mockImplementationOnce(() => Promise.resolve(true));
      jest
        .spyOn(absenRepository, 'create')
        .mockImplementationOnce(() => Promise.resolve('OK'));
      const absenTime = new Date();
      absenTime.setHours(17);
      absenTime.setMinutes(59);
      const request: AbsenRequestDto = {
        absenTime,
        details: 'tiyas ganteng',
        location: {
          lat: -6.184899,
          lon: 106.83108,
        },
      };
      const status = await absenUseCase.execute('tiyas ganteng', request);

      expect(status).toBe(AbsenStatus.ONTIME);
    });

    it('Is a check out absen Overtime', async () => {
      jest
        .spyOn(absenRepository, 'checkDataByKey')
        .mockImplementationOnce(() => Promise.resolve(true));
      jest
        .spyOn(absenRepository, 'create')
        .mockImplementationOnce(() => Promise.resolve('OK'));
      const absenTime = new Date();
      absenTime.setHours(18);
      absenTime.setMinutes(1);
      const request: AbsenRequestDto = {
        absenTime,
        details: 'tiyas ganteng',
        location: {
          lat: -6.184899,
          lon: 106.83108,
        },
      };
      const status = await absenUseCase.execute('tiyas ganteng', request);

      expect(status).toBe(AbsenStatus.OVERTIME);
    });
  });

  describe('Failed', () => {
    it('Is a absen from somewhere awaayyyy', async () => {
      jest
        .spyOn(absenRepository, 'checkDataByKey')
        .mockImplementationOnce(() => Promise.resolve(false));
      jest
        .spyOn(absenRepository, 'create')
        .mockImplementationOnce(() => Promise.resolve('OK'));
      const absenTime = new Date();
      absenTime.setHours(8);
      absenTime.setMinutes(1);
      const request: AbsenRequestDto = {
        absenTime,
        details: 'tiyas ganteng',
        location: {
          lat: -6.184899,
          lon: 102.83108,
        },
      };
      try {
        await absenUseCase.execute('tiyas ganteng', request);
      } catch (error) {
        expect(error).toBeInstanceOf(DistanceTooFarException);
      }
    });
  });
});
