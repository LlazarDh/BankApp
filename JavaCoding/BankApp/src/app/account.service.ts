import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './Account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseURL = 'http://localhost:9098';

  constructor(private httpClient: HttpClient) {}

  createAccount(account: Account): Observable<Account> {
    // @ts-ignore
    return this.httpClient.post(this.baseURL + '/addAccount', account);
  }

  getAccountList(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.baseURL + '/accounts');
    {
    }
  }
}
