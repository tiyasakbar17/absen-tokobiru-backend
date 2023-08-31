import { Body, Controller, Post, Req } from '@nestjs/common';
import { AbsenRequestDto } from '../application/absen/absen.dto';
import { CustomExpressRequest } from 'src/shared/interfaces/customExpressRequest';
import { absenRoutes } from '../constant/routes';
import { AbsenStatus } from '../constant/enums';
import { AbsenUseCase } from '../application/absen/absen.useCase';

@Controller()
export class AbsenController {
  constructor(private readonly absenUseCase: AbsenUseCase) {}

  @Post(absenRoutes.absen.path)
  async absen(
    @Req() req: CustomExpressRequest,
    @Body() absenRequestDto: AbsenRequestDto,
  ): Promise<AbsenStatus> {
    return this.absenUseCase.execute(req.tokenPayload.id, absenRequestDto);
  }
}
