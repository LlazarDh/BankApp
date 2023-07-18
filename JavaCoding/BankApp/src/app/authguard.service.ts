import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  canActivate() {
    if (this.loginService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/authenticate']);
    return false;
  }
}
