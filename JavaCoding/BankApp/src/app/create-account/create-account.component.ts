import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../Account';
import { Currency } from '../Currency';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  // @ts-ignore

  account: Account = {};
  accountForm: FormGroup;

  currency = Object.values(Currency);

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      bankAccountId: [null],
      iban: [null],
      status: [null],
      balance: [null],
      currency: [null],
    });
  }

  saveAccount() {
    // @ts-ignore
    let newAccount: Account = {
      // @ts-ignore
      balance: this.accountForm.get('balance')?.value,
      // @ts-ignore
      currency: this.accountForm.get('currency')?.value,
    };
    this.accountService.createAccount(newAccount).subscribe(
      (data) => {
        console.log(data);
        this.goToAccountList();
      },
      (error) => console.log(error)
    );
  }

  goToAccountList() {
    this.router.navigate(['account-list']);
  }

  onSubmit() {
    console.log(this.account);
    this.saveAccount();
  }

  ngOnInit(): void {}
}
