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
    this.dataService.addCard(card).subscribe((card: any) => {
      this.cards = [...this.cards, card];
      this.cardSubject.next(this.cards);
    });
  }

  deleteCard(id: string) {
    this.dataService.deleteCard(id).subscribe(() => {
      this.cards = this.cards.filter((card) => card.id !== id);
      this.cardSubject.next(this.cards);
    });
  }

  updateCard(card: Card) {
    this.dataService.updateCard(card).subscribe((card: any) => {
      this.cards = this.cards.map((c) => {
        if (c.id === card.id) {
          return card;
        }
        return c;
      });
      this.cardSubject.next(this.cards);
    });
  }
}
