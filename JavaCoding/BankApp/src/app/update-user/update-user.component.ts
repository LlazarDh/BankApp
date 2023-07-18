import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Role } from '../Role';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  // @ts-ignore
  id: number;
  // @ts-ignore
  user: User = {};
  // @ts-ignore
  userForm: FormGroup;
  // @ts-ignore
  role = Object.values(Role);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    console.log(this.route.snapshot.params['id'], ' userId');
    this.userForm = this.fb.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe(
      (currentUser: User) => {
        console.log(currentUser, ' user');
        this.userForm = this.fb.group({
          firstName: currentUser?.firstName,
          lastName: currentUser?.lastName,
          email: currentUser.email,
          password: currentUser.password,
          role: currentUser.role,
        });
      },
      (error) => console.log(error)
    );
    console.log(this.userForm, ' userForm');
  }

  // @ts-ignore

  updateUser() {
    // @ts-ignore

    let updateUser: User = {
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
    console.log(updateUser, ' user');
    // @ts-ignore
    this.userService
      .updateUser(updateUser, parseInt(this.route.snapshot.params['id']))
      .subscribe(
        (data) => {
          console.log(data);
          this.goToUserList();
        },
        (error) => console.log(error)
      );
  }

  onSubmit() {
    console.log(this.user);
    this.updateUser();
  }

  goToUserList() {
    this.router.navigate(['/home']);
  }
}
