import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginServiceService } from './login.service';
import { AuthGuardService } from './authguard.service';

// import {LoginServiceService} from "../../services/login-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showMe: boolean = false;
  title: any;

  // @ts-ignore
  id: number;
  constructor(
    private _authService: LoginServiceService,
    private router: Router
  ) {}
  ngOnInit() {
    // @ts-ignore
    // this.id = localStorage.getItem('id')
    console.log('Home id', this.id);
  }
  doLogout() {
    this._authService.logOut();
    this.router.navigate(['authenticate']);
  }

  isUserLoggedIn() {
    //@ts-ignore
    return (
      localStorage.getItem('token') === null ||
      //@ts-ignore
      sessionStorage.getItem('token') === null
    );
  }
}
