import { AbsenStatus } from 'src/absen/constant/enums';

export interface ILocation {
  lon: number;
  lat: number;
}
export interface Absensi {
  time: string;
  status: AbsenStatus;
  details: string;
  location: ILocation;
}

export interface TodayAbsen {
  in: Absensi;
  out: Absensi;
}

export interface UserAbsenObject {
  [key: string]: Absensi;
}
