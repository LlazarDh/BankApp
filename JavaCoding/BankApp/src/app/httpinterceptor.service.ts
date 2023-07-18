import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      sessionStorage.getItem('token') ||
      (localStorage.getItem('token') &&
        req.url != 'http://localhost:9098/api/v1/auth/authenticate')
    ) {
      // console.log(localStorage.getItem('token'));
      console.log(req.url);
      // @ts-ignore
      req = req.clone({
        // @ts-ignore
        headers: req.headers.set(
          'Authorization',
          // @ts-ignore
          JSON.parse(localStorage.getItem('token'))
        ),
      });
    }

    if (this.loginService.isTokenExpiredd()) {
      this.loginService.logOut();
    }

    console.log('req', req);
    return next.handle(req);
  }
}
