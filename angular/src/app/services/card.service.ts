import { Injectable, inject } from '@angular/core';
import { DataService } from './data.service';
import { Card } from '../data_classes/card';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  card: Card = new Card();
  cardSubject: BehaviorSubject<Card> = new BehaviorSubject<Card>(new Card());
  cards: Card[] = [];
  cardsSubject: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  dataService = inject(DataService);

  constructor() {
    this.init();
  }

  init() {
    this.card = new Card();
    this.dataService.getCards().subscribe((cards: any) => {
      this.cards = [...cards];
      this.cardsSubject.next(this.cards);
    });
  }

  getCards() {
    return this.cardsSubject;
  }

  getCard(id: string) {
    this.dataService.getCard(id).subscribe((res: any) => {
      this.card = res;
      this.cardSubject.next(this.card);
    });
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
        this.cardsSubject.next(this.cards);
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
        this.cardsSubject.next(this.cards);
      }
    });
  }
}
