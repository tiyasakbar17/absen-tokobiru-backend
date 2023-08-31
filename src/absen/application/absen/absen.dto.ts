import { IsNotEmpty, IsEmail } from 'class-validator';
import { AbsenStatus } from 'src/absen/constant/enums';
import { ILocation } from 'src/absen/domain/models/absen.entity';

export class AbsenRequestDto {
  @IsNotEmpty()
  absenTime: Date;

  @IsNotEmpty()
  location: ILocation;

  details: string;
}

export class AbsenResponseDto {
  status: AbsenStatus;
}
