import { Currency } from './Currency';

export interface Account {
  bankAccountId: number;
  iban?: string;
  status?: string;
  balance?: number;
  currency?: Currency;
}
