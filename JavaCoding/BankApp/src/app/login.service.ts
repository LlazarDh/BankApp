import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, of } from 'rxjs';
import { AuthenticationRequest } from './AuthenticationRequest';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  remember: boolean = false;
  currentUser: String = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  getLoggedUser() {
    return this.http.get<any>(
      'http://localhost:9098/api/v1/auth/authenticate/loggedUser'
    );
  }

  login(request: AuthenticationRequest, remember: boolean) {
    console.log('log', request);
    return this.http
      .post<any>('http://localhost:9098/api/v1/auth/authenticate', request)
      .pipe(
        map((auth) => {
          console.log(auth, ' authentication');
          if (remember) {
            localStorage.setItem('username', <string>request.email);
            let tokenStr = 'Bearer ' + auth.jwt;
            localStorage.setItem('token', tokenStr);
            this.currentUser = <string>request.email;
            return auth;
          } else {
            sessionStorage.setItem('username', <string>request.email);
            let tokenStr = 'Bearer ' + auth.jwt;
            sessionStorage.setItem('token', tokenStr);
            this.currentUser = <string>request.email;
          }
          return auth;
        }),
        catchError((err) => of(console.log(err)))
      );
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  isUserLoggedIn() {
    if (!!localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : '';
      let parsedToken = JSON.parse(token ? token : '');
      console.log(parsedToken);
      let user =
        sessionStorage.getItem('username') || localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(parsedToken) && user !== null;
    } else {
      return false;
    }
  }

  isTokenExpiredd() {
    // let token = sessionStorage.getItem('token') || localStorage.getItem('token');
    let token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    if (!!token) {
      let parsedToken = JSON.parse(token ? token : '');
      console.log(parsedToken);
      return this.jwtHelper.isTokenExpired(parsedToken);
    } else {
      return false;
    }
  }
}
