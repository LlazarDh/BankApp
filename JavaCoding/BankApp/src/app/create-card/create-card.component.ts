import { Component, OnInit } from '@angular/core';
import { Card } from '../Card';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Type } from '../Type';
import { Status } from '../Status';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CardService } from '../card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent implements OnInit {
  // @ts-ignore
  id: number;
  // @ts-ignore
  card: Card = {};

  cardForm: FormGroup;

  type = Object.values(Type);

  status = Object.values(Status);

  constructor(
    private cardService: CardService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cardForm = this.fb.group({
      cardId: [null],
      reason: [null],
      type: [null],
      status: [null],
      salary: [null],
    });
  }
  ngOnInit(): void {}

  saveCard() {
    const id = parseInt(this.route.snapshot.params['id']);
    console.log('Snapshot value ', this.route.snapshot.params['id'], 'Id', id);
    if (isNaN(id)) {
      console.log('Invalid ID:', this.route.snapshot.params['id']);
      return;
    }

    let formObject: any = {
      reason: this.cardForm.get('reason')?.value,
      type: this.cardForm.get('type')?.value,
      status: this.cardForm.get('status')?.value,
      salary: this.cardForm.get('salary')?.value,
    };
    // @ts-ignore
    let card: Card = {
      reason: formObject.reason,
      type: formObject.type,
      status: formObject.status,
      // @ts-ignore
      salary: formObject.salary,
    };

    this.cardService.createCardById(card, id).subscribe(
      (data) => {
        console.log(data);
        this.goToCardList();
      },
      (error) => console.log(error)
    );
  }

  private goToCardList() {
    this.router.navigate(['card-list']);
  }
  onSubmit() {
    console.log(this.card);
    this.saveCard();
  }
}
