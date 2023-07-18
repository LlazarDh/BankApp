import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Role } from '../Role';
import { LoginServiceService } from '../login.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  // @ts-ignore
  userForm: FormGroup;

  role = Object.values(Role);

  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    // @ts-ignore
    this.userService.getUserList().subscribe((data) => {
      this.users = data;
    });
  }

  updateUser(id: number) {
    // @ts-ignore
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data) => {
      // @ts-ignore
      let user: User = this.users.find((u) => u.userId == id);
      const index = this.users.indexOf(user);
      this.users.splice(index, 1);
    });
  }
}
