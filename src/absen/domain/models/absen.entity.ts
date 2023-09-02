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
  date: Date;
  in: Absensi;
  out: Absensi;
}

export interface UserAbsenObject {
  [key: string]: Absensi;
}

export interface TodayAbsenObj {
  [key: string]: Partial<TodayAbsen>;
}
