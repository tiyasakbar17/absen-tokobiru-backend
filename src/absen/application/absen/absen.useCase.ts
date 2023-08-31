import { Injectable } from '@nestjs/common';
import { AbsenRepositoryImpl } from 'src/absen/domain/repository/absen.repository';
import { AbsenRequestDto } from './absen.dto';
import { AbsenStatus, AbsenTime } from 'src/absen/constant/enums';
import { Absensi, ILocation } from 'src/absen/domain/models/absen.entity';
import { DistanceTooFarException } from 'src/absen/exceptions/tooFarFromOffice.exception';

@Injectable()
export class AbsenUseCase {
  constructor(private readonly absenRepository: AbsenRepositoryImpl) {}

  #convertRadian(num: number): number {
    return (num * Math.PI) / 180;
  }
  #checkDistance(currentLocation: ILocation) {
    const lat2 = -6.184899;
    const lon2 = 106.83108;

    const earthRadius = 6371; // Radius of the earth in km
    const latitudeDistance = this.#convertRadian(lat2 - currentLocation.lat);
    const longitudeDistance = this.#convertRadian(lon2 - currentLocation.lon);
    const a =
      Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
      Math.cos(this.#convertRadian(currentLocation.lat)) *
        Math.cos(this.#convertRadian(lat2)) *
        Math.sin(longitudeDistance / 2) *
        Math.sin(longitudeDistance / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c * 1000; // Distance in m
    return distance;
  }

  async execute(
    id: string,
    absenRequestDto: AbsenRequestDto,
  ): Promise<AbsenStatus> {
    // CheckLocation
    const distance = this.#checkDistance(absenRequestDto.location);
    if (distance > 400) throw new DistanceTooFarException();

    absenRequestDto.absenTime = new Date(absenRequestDto.absenTime);
    // get absen status
    const today = new Date();
    today.setMinutes(0);

    const key = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;

    const isCheckOut = await this.absenRepository.checkDataByKey(
      `${id}/${key}`,
    );

    today.setHours(8);
    let absenTime = AbsenTime.IN;
    if (isCheckOut) {
      today.setHours(17);
      absenTime = AbsenTime.OUT;
    }
    const overtime = new Date(today.getMilliseconds() + 1 * 60 * 60 * 1000);

    const absenMinutes = absenRequestDto.absenTime.getMinutes();
    const time: string = `${absenRequestDto.absenTime.getHours()}:${
      absenMinutes > 9 ? absenMinutes : '0' + absenMinutes
    }`;

    let status: AbsenStatus;
    switch (true) {
      case absenTime === AbsenTime.IN && absenRequestDto.absenTime > today:
        status = AbsenStatus.LATE;
        break;
      case absenTime === AbsenTime.OUT && absenRequestDto.absenTime < today:
        status = AbsenStatus.EARLY;
        break;
      case absenTime === AbsenTime.OUT && absenRequestDto.absenTime > overtime:
        status = AbsenStatus.OVERTIME;
        break;
      default:
        status = AbsenStatus.ONTIME;
    }

    const payload: Absensi = {
      status,
      time,
      details: absenRequestDto.details,
      location: absenRequestDto.location,
    };

    await this.absenRepository.create(id, key, absenTime, payload);

    return status;
  }
}
