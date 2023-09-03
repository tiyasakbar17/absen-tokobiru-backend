import { Test, TestingModule } from '@nestjs/testing';
import { AbsenController } from './absen.controller';
import { TokenValidationMiddleware } from 'src/shared/middlewares/tokenValidation';
import { AbsenRepositoryImpl } from '../domain/repository/absen.repository';
import { JSONWebTokenUtils } from 'src/auth/infrastructure/external/jsonWebtoken';
import { AbsenUseCase } from '../application/absen/absen.useCase';
import { HistoryUseCase } from '../application/history/history.useCase';
import { CustomExpressRequest } from 'src/shared/interfaces/customExpressRequest';
import {
  AbsenRequestDto,
  AbsenResponseDto,
} from '../application/absen/absen.dto';
import { AbsenStatus } from '../constant/enums';
import { ResponseDtoUtils } from 'src/shared/utis/response.utils';
import { HistoryResponseDto } from '../application/history/history.dto';

describe('AppController', () => {
  let absenController: AbsenController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AbsenController],
      providers: [
        TokenValidationMiddleware,
        AbsenRepositoryImpl,
        AbsenUseCase,
        HistoryUseCase,
        JSONWebTokenUtils,
      ],
    }).compile();

    absenController = app.get<AbsenController>(AbsenController);
  });

  describe('Absen Controller', () => {
    it('should return absens status as what absen useCase returns', async () => {
      const request: CustomExpressRequest = {
        tokenPayload: { id: 'tiyas ganteng', email: 'tiyas@ganteng.com' },
      } as CustomExpressRequest;

      const body: AbsenRequestDto = {
        absenTime: new Date(),
        details: 'Tiyas ganteng',
        location: {
          lat: 123,
          lon: 123,
        },
      };

      jest
        .spyOn(AbsenUseCase.prototype, 'execute')
        .mockImplementationOnce(() => Promise.resolve(AbsenStatus.LATE));

      const results = await absenController.absen(request, body);

      const expectedResults = ResponseDtoUtils.success<AbsenResponseDto>(
        'Absen Success',
        {
          status: AbsenStatus.LATE,
        },
      );
      expect(results).toEqual(expectedResults);
    });
    it('should return history as what history useCase returns', async () => {
      const request: CustomExpressRequest = {
        tokenPayload: { id: 'tiyas ganteng', email: 'tiyas@ganteng.com' },
      } as CustomExpressRequest;

      jest
        .spyOn(HistoryUseCase.prototype, 'execute')
        .mockImplementationOnce(() => Promise.resolve([]));

      const results = await absenController.history(request);

      const expectedResults = ResponseDtoUtils.success<HistoryResponseDto>(
        'Data successfully fetched',
        {
          histories: [],
        },
      );
      expect(results).toEqual(expectedResults);
    });
  });
});
