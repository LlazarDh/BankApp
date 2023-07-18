import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:9098';

  constructor(private httpClient: HttpClient) {}

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL + '/users');
  }

  createUser(user: User): Observable<User> {
    let headers = new Headers();
    // @ts-ignore
    console.log(JSON.parse(localStorage.getItem('token')), ' token');
    // @ts-ignore
    // headers.append('Authorization', JSON.parse(localStorage.getItem('token')));
    // headers.append('Access-Control-Allow-Origin', '*');

    // @ts-ignore
    return this.httpClient.post(this.baseURL + '/addUser', user, {
      // @ts-ignore
      headers,
      mode: 'no-cors',
    });
  }

  getUserById(id: number) {
    return this.httpClient.get<any>(this.baseURL + `/users/${id}`);
  }

  updateUser(user: User, id: number): Observable<User> {
    // @ts-ignore
    return this.httpClient.put<User>(this.baseURL + `/users/${id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.baseURL + `/users/${id}`);
  }
}
