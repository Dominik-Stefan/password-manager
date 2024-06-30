import { Injectable, inject } from '@angular/core';
import { DataService } from './data.service';
import { Card } from '../data_classes/card';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards: Card[] = [];
  cardSubject: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  dataService = inject(DataService);

  constructor() {
    this.init();
  }

  init() {
    this.dataService.getCards().subscribe((cards: any) => {
      this.cards = [...cards];
      this.cardSubject.next(this.cards);
    });
  }

  getCards() {
    return this.cardSubject;
  }

  addCard(card: Card) {
    this.dataService.addCard(card).subscribe((res: any) => {
      if (res.status === 200) {
        this.init();
      }
    });
  }

  deleteCard(id: string) {
    this.dataService.deleteCard(id).subscribe((res: any) => {
      if (res.status == 200) {
        this.cards = this.cards.filter((card) => card.id !== id);
        this.cardSubject.next(this.cards);
      }
    });
  }

  updateCard(card: Card) {
    this.dataService.updateCard(card).subscribe((res: any) => {
      if (res.status == 200) {
        this.cards = this.cards.map((c) => {
          if (c.id === card.id) {
            return card;
          }
          return c;
        });
        this.cardSubject.next(this.cards);
      }
    });
  }
}
