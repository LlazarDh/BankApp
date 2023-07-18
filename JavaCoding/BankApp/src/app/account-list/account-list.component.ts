import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Account } from '../Account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.getAccountS();
  }
  private getAccountS() {
    this.accountService.getAccountList().subscribe((data) => {
      this.accounts = data;
    });
  }
}
