import { RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';

interface IRoutes {
  absen: RouteInfo;
}

export const absenRoutes: IRoutes = {
  absen: {
    path: 'absen/absen',
    method: RequestMethod.POST,
  },
};

export const protectedRoutes: RouteInfo[] = [absenRoutes.absen];
