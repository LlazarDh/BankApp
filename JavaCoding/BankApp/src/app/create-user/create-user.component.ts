import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Role } from '../Role';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  // @ts-ignore
  user: User = {};
  userForm: FormGroup;

  role = Object.values(Role);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      password: [null],
      role: [null],
    });
  }

  saveUser() {
    // @ts-ignore
    let newUser: User = {
      // @ts-ignore
      firstName: this.userForm.get('firstName')?.value,
      // @ts-ignore
      lastName: this.userForm.get('lastName')?.value,
      // @ts-ignore
      email: this.userForm.get('email')?.value,
      // @ts-ignore
      password: this.userForm.get('password')?.value,
      // @ts-ignore
      role: this.userForm.get('role')?.value,
    };
    this.userService.createUser(newUser).subscribe(
      (data) => {
        console.log(data);
        this.goToUserList();
      },
      (error) => console.log(error)
    );
  }

  goToUserList() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    console.log(this.user);
    this.saveUser();
  }

  ngOnInit(): void {}
}
