import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginServiceService } from '../login.service';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../AuthenticationRequest';
import { TokenResponse } from '../user';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css'],
})
export class LogincomponentComponent {
  showMe: boolean = false;
  error: string = '';
  loginForm: FormGroup;
  rememberMe: boolean = false;
  token: string = '';

  constructor(
    private loginService: LoginServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    if (this.loginService.isUserLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  doLogin() {
    console.log();

    this.showMe = !this.showMe;

    let login = this.loginForm.value;
    console.log(login, ' login value');
    let request: AuthenticationRequest = {
      email: login.email,
      password: login.password,
    };
    this.loginService.login(request, this.rememberMe).subscribe(
      (data) => {
        console.log(data, ' data object');

        if (data.token) {
          this.token = data.token;
          console.log(this.token, ' inside');
        }

        let tokenStr = 'Bearer ' + this.token;
        localStorage.setItem('token', JSON.stringify(tokenStr));
        console.log(data?.token, ' data');

        // @ts-ignore
        console.log(JSON.parse(localStorage.getItem('token')), ' token, login');
        this.router.navigate(['/home']);
        console.log('hello');
      },
      (data) => {
        console.log('err');
        this.error = 'Invalid Username or Password!';
      }
    );
  }

  doLogout() {
    this.loginService.logOut();
    this.router.navigate(['login']);
  }

  remember() {
    this.rememberMe = !this.rememberMe;
    console.log(this.rememberMe);
  }
}
