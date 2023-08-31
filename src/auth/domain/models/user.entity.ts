import { IMonthlySummary } from 'src/auth/shared/MonthlySummary';

export interface Users {
  id: string;
  name: string;
  email: string;
  password: string;
  monthlySummary: IMonthlySummary;
}
