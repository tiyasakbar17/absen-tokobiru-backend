import { RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';

interface IRoutes {
  absen: RouteInfo;
  history: RouteInfo;
}

export const absenRoutes: IRoutes = {
  absen: {
    path: 'absen/absen',
    method: RequestMethod.POST,
  },
  history: {
    path: 'absen/history',
    method: RequestMethod.GET,
  },
};

export const protectedRoutes: RouteInfo[] = [
  absenRoutes.absen,
  absenRoutes.history,
];
