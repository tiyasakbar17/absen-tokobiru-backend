import { RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';

interface IRoutes {
  login: RouteInfo;
  register: RouteInfo;
}

export const authRoutes: IRoutes = {
  login: {
    path: 'auth/login',
    method: RequestMethod.POST,
  },
  register: {
    path: 'auth/register',
    method: RequestMethod.POST,
  },
};
