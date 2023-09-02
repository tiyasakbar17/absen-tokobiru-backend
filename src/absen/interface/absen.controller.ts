import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  AbsenRequestDto,
  AbsenResponseDto,
} from '../application/absen/absen.dto';
import { CustomExpressRequest } from 'src/shared/interfaces/customExpressRequest';
import { absenRoutes } from '../constant/routes';
import { AbsenStatus } from '../constant/enums';
import { AbsenUseCase } from '../application/absen/absen.useCase';
import { HistoryUseCase } from '../application/history/history.useCase';
import { ResponseDtoUtils } from 'src/shared/utis/response.utils';
import { HistoryResponseDto } from '../application/history/history.dto';

@Controller()
export class AbsenController {
  constructor(
    private readonly absenUseCase: AbsenUseCase,
    private readonly historyUseCase: HistoryUseCase,
  ) {}

  @Post(absenRoutes.absen.path)
  async absen(
    @Req() req: CustomExpressRequest,
    @Body() absenRequestDto: AbsenRequestDto,
  ) {
    const status = await this.absenUseCase.execute(
      req.tokenPayload.id,
      absenRequestDto,
    );
    return ResponseDtoUtils.success<AbsenResponseDto>('Absen Success', {
      status: status,
    });
  }

  @Get(absenRoutes.history.path)
  async history(@Req() req: CustomExpressRequest) {
    const data = await this.historyUseCase.execute(req.tokenPayload.id);
    return ResponseDtoUtils.success<HistoryResponseDto>(
      'Data successfully fetched',
      {
        histories: data,
      },
    );
  }
}
