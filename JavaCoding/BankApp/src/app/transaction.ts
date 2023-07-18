import { Currency } from './Currency';
import { Type } from './Type';

export interface Transaction {
  iban?: string;
  transactionId?: number;
  amount?: number;
  currency?: Currency;
  type?: Type;
}
