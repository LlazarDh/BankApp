import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transaction';
import { Observable } from 'rxjs';
import { Card } from './Card';
import { Account } from './Account';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private baseURL = 'http://localhost:9098';

  // @ts-ignore
  id: number;
  constructor(private httpClient: HttpClient) {}

  createCardById(card: Card, id: number): Observable<Card> {
    // @ts-ignore
    return this.httpClient.post<Card>(this.baseURL + `/addCard/${id}`, card);
  }

  getCardList(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(this.baseURL + '/cards');
    {
    }
  }
}
