import { Type } from './Type';
import { Status } from './Status';

export interface Card {
  salary: number;
  cardId: number;
  reason: String;
  type: Type;
  status: Status;
}
