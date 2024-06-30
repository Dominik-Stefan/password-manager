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

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  id: string = '';
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
    this.route.params.subscribe((params) => (this.id = params['id']));
  }

  goBack() {
    window.history.back();
  }

  add() {
    switch (this.id) {
      case 'account': {
        const newAccount = new Account();
        newAccount.name = this.accountForm.get('name')?.value || '';
        newAccount.username = this.accountForm.get('username')?.value || '';
        newAccount.password = this.accountForm.get('password')?.value || '';
        this.accountService.addAccount(newAccount);
        window.history.back();
        break;
      }
      case 'card': {
        const newCard = new Card();
        newCard.name = this.cardForm.get('name')?.value || '';
        newCard.cardholder_name =
          this.cardForm.get('cardholderName')?.value || '';
        newCard.number = this.cardForm.get('number')?.value || '';
        newCard.expiration = this.cardForm.get('expiration')?.value || '';
        newCard.cvv = this.cardForm.get('cvv')?.value || '';
        this.cardService.addCard(newCard);
        window.history.back();
        break;
      }
      case 'note': {
        const newNote = new Note();
        newNote.name = this.noteForm.get('name')?.value || '';
        newNote.text = this.noteForm.get('text')?.value || '';
        this.noteService.addNote(newNote);
        window.history.back();
        break;
      }
    }
  }
}
