import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Account } from '../data_classes/account';
import { Card } from '../data_classes/card';
import { Note } from '../data_classes/note';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiAccountsUrl = 'http://localhost:8081/api/accounts';
  apiCardsUrl = 'http://localhost:8081/api/cards';
  apiNotesUrl = 'http://localhost:8081/api/notes';

  //apiAccountsUrl = '/api/accounts';
  //apiCardsUrl = '/api/cards';
  //apiNotesUrl = '/api/notes';

  constructor() {}

  http = inject(HttpClient);

  getAccounts() {
    return this.http.get(this.apiAccountsUrl);
  }

  getNotes() {
    return this.http.get(this.apiNotesUrl);
  }

  getCards() {
    return this.http.get(this.apiCardsUrl);
  }

  addAccount(account: Account) {
    return this.http.post(this.apiAccountsUrl, account);
  }

  addCard(card: Card) {
    return this.http.post(this.apiCardsUrl, card);
  }

  addNote(note: Note) {
    return this.http.post(this.apiNotesUrl, note);
  }

  updateAccount(account: Account) {
    return this.http.put(this.apiAccountsUrl, account);
  }

  updateCard(card: Card) {
    return this.http.put(this.apiCardsUrl, card);
  }

  updateNote(note: Note) {
    return this.http.put(this.apiNotesUrl, note);
  }

  deleteAccount(id: string) {
    return this.http.delete(this.apiAccountsUrl + '/' + id);
  }

  deleteCard(id: string) {
    return this.http.delete(this.apiCardsUrl + '/' + id);
  }

  deleteNote(id: string) {
    return this.http.delete(this.apiNotesUrl + '/' + id);
  }
}
