import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Account } from '../data_classes/account';
import { Card } from '../data_classes/card';
import { Note } from '../data_classes/note';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  http = inject(HttpClient);

  getAccounts() {
    return this.http.get(environment.apiAccountsUrl);
  }

  getNotes() {
    return this.http.get(environment.apiNotesUrl);
  }

  getCards() {
    return this.http.get(environment.apiCardsUrl);
  }

  getAccount(id: string) {
    return this.http.get(environment.apiAccountsUrl + '/' + id);
  }

  getCard(id: string) {
    return this.http.get(environment.apiCardsUrl + '/' + id);
  }

  getNote(id: string) {
    return this.http.get(environment.apiNotesUrl + '/' + id);
  }

  addAccount(account: Account) {
    return this.http.post(environment.apiAccountsUrl, account);
  }

  addCard(card: Card) {
    return this.http.post(environment.apiCardsUrl, card);
  }

  addNote(note: Note) {
    return this.http.post(environment.apiNotesUrl, note);
  }

  updateAccount(account: Account) {
    return this.http.put(environment.apiAccountsUrl, account);
  }

  updateCard(card: Card) {
    return this.http.put(environment.apiCardsUrl, card);
  }

  updateNote(note: Note) {
    return this.http.put(environment.apiNotesUrl, note);
  }

  deleteAccount(id: string) {
    return this.http.delete(environment.apiAccountsUrl + '/' + id);
  }

  deleteCard(id: string) {
    return this.http.delete(environment.apiCardsUrl + '/' + id);
  }

  deleteNote(id: string) {
    return this.http.delete(environment.apiNotesUrl + '/' + id);
  }
}
