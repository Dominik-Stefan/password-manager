import { Component, inject } from '@angular/core';
import { Card } from '../../data_classes/card';
import { User } from '../../data_classes/user';
import { CardService } from '../../services/card.service';
import { UserService } from '../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  user: User = new User();

  cards: Card[] = [];
  cardSubject: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  constructor() {
    this.init();
  }

  router = inject(Router);
  userService = inject(UserService);
  cardService = inject(CardService);

  init() {
    this.user = this.userService.getUser();
    this.cardSubject = this.cardService.getCards();
    this.cardSubject.subscribe((res) => {
      this.cards = res;
    });
  }

  deleteCard(id: string) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.cardService.deleteCard(id);
    }
  }

  goToAdd() {
    this.router.navigate(['new', 'card']);
  }
}
