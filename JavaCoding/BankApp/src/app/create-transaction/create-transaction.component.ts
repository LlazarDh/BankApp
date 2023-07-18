import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Currency } from '../Currency';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../transaction.service';
import { Type } from '../Type';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css'],
})
export class CreateTransactionComponent implements OnInit {
  // @ts-ignore
  id: number;
  transaction: Transaction = {};
  transactionForm: FormGroup;
  currency = Object.values(Currency);
  type = Object.values(Type);

  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      transactionId: [null],
      amount: [null],
      type: [null],
      currency: [null],
      iban: [null],
    });
  }

  ngOnInit(): void {}

  saveTransaction() {
    const id = parseInt(this.route.snapshot.params['id']);
    console.log('Snapshot value ', this.route.snapshot.params['id'], 'Id', id);
    if (isNaN(id)) {
      console.log('Invalid ID:', this.route.snapshot.params['id']);
      return;
    }

    // @ts-ignore
    let formObject: any = {
      amount: this.transactionForm.get('amount')?.value,
      currency: this.transactionForm.get('currency')?.value,
      type: this.transactionForm.get('type')?.value,
      // @ts-ignore
      iban: this.transactionForm.get('iban')?.value,
    };
    let transaction: Transaction = {
      amount: formObject.amount,
      currency: formObject.currency,
      type: formObject.type,
      iban: formObject.iban,
    };
    this.transactionService.createTransactionById(transaction, id).subscribe(
      (data) => {
        console.log(data);
        this.goToTransactionList();
      },
      (error) => console.log(error)
    );
  }

  goToTransactionList() {
    this.router.navigate(['transaction-list']);
  }

  onSubmit() {
    console.log(this.transaction);
    this.saveTransaction();
  }
}
