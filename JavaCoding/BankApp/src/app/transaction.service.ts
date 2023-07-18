import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from './Account';
import { Observable } from 'rxjs';
import { Transaction } from './transaction';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseURL = 'http://localhost:9098';
  // @ts-ignore
  id: number;

  constructor(private httpClient: HttpClient) {}

  createTransactionById(
    transaction: Transaction,
    id: number
  ): Observable<Transaction> {
    // @ts-ignore
    return this.httpClient.post<Transaction>(
      this.baseURL + `/addTransaction/${id}`,
      transaction
    );
  }

  getTransactionList() {
    return this.httpClient.get<any>(this.baseURL + `/transactions`);
  }
}
