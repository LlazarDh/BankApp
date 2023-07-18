import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { Card } from '../Card';
import { AccountService } from '../account.service';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardService: CardService) {}
  ngOnInit(): void {
    this.getCards();
  }

  private getCards() {
    this.cardService.getCardList().subscribe((data) => {
      this.cards = data;
    });
  }
}
