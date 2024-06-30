import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CardService } from '../../services/card.service';
import { NoteService } from '../../services/note.service';
import { Account } from '../../data_classes/account';
import { Card } from '../../data_classes/card';
import { Note } from '../../data_classes/note';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  id: string = '';
  type: string = '';

  account: Account = new Account();
  accountSubject: BehaviorSubject<Account> = new BehaviorSubject<Account>(
    new Account()
  );

  card: Card = new Card();
  cardSubject: BehaviorSubject<Card> = new BehaviorSubject<Card>(new Card());

  note: Note = new Note();
  noteSubject: BehaviorSubject<Note> = new BehaviorSubject<Note>(new Note());

  accountForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  cardForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cardholderName: new FormControl('', Validators.required),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{16}$/),
    ]),
    brand: new FormControl('', Validators.required),
    expiration: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{3}$/),
    ]),
  });
  noteForm = new FormGroup({
    name: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });

  route = inject(ActivatedRoute);
  accountService = inject(AccountService);
  cardService = inject(CardService);
  noteService = inject(NoteService);

  constructor() {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
      this.id = params['id'];
    });
    this.init();
  }

  init() {
    switch (this.type) {
      case 'account': {
        this.accountSubject = this.accountService.getAccount(this.id);
        this.accountSubject.subscribe((res) => {
          this.account = res;
        });
        break;
      }
      case 'card': {
        this.cardSubject = this.cardService.getCard(this.id);
        this.cardSubject.subscribe((res) => {
          this.card = res;
        });
        break;
      }
      case 'note': {
        this.noteSubject = this.noteService.getNote(this.id);
        this.noteSubject.subscribe((res) => {
          this.note = res;
        });
        break;
      }
    }
  }

  goBack() {
    window.history.back();
  }

  update() {
    switch (this.type) {
      case 'account': {
        const account = new Account();
        account.id = this.id;
        account.name = this.accountForm.get('name')?.value || '';
        account.username = this.accountForm.get('username')?.value || '';
        account.password = this.accountForm.get('password')?.value || '';
        this.accountService.updateAccount(account);
        window.history.back();
        break;
      }
      case 'card': {
        const card = new Card();
        card.id = this.id;
        card.name = this.cardForm.get('name')?.value || '';
        card.cardholder_name = this.cardForm.get('cardholderName')?.value || '';
        card.number = this.cardForm.get('number')?.value || '';
        card.brand = this.cardForm.get('brand')?.value || '';
        card.expiration = this.cardForm.get('expiration')?.value || '';
        card.cvv = this.cardForm.get('cvv')?.value || '';
        this.cardService.updateCard(card);
        window.history.back();
        break;
      }
      case 'note': {
        const note = new Note();
        note.id = this.id;
        note.name = this.noteForm.get('name')?.value || '';
        note.text = this.noteForm.get('text')?.value || '';
        this.noteService.updateNote(note);
        window.history.back();
        break;
      }
    }
  }
}
