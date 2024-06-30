import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../data_classes/user';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { NoteService } from './note.service';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginPath = 'http://localhost:8081/auth/login';
  signupPath = 'http://localhost:8081/auth/register';
  validatePath = 'http://localhost:8081/auth/validate';

  //loginPath = '/auth/login';
  //signupPath = '/auth/register';
  //validatePath = '/auth/validate';

  constructor() {}

  http = inject(HttpClient);
  router = inject(Router);
  accounetService = inject(AccountService);
  cardService = inject(CardService);
  noteService = inject(NoteService);

  refreshData() {
    this.accounetService.init();
    this.cardService.init();
    this.noteService.init();
  }

  tokenLogin() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);

      this.http
        .post(this.validatePath, {}, { headers: headers })
        .subscribe((data: any) => {
          if (data.status == 'ok') {
            this.refreshData();
            this.router.navigate(['/dashboard']);
          } else if (data.status == 401) {
            alert(data.message);
          } else {
            console.log(data);
          }
        });
    }
  }

  login(user: User) {
    this.http.post(this.loginPath, user).subscribe((data: any) => {
      if (data.token) {
        sessionStorage.setItem('token', data.token);
        this.refreshData();
        this.router.navigate(['/dashboard']);
      } else if (data.status) {
        alert(data.status);
      } else {
        console.log(data);
      }
    });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  signup(user: User) {
    this.http.post(this.signupPath, user).subscribe((data: any) => {
      if (data.status == 'ok') {
        alert('Account created successfully. Please login');
      } else if (data.status) {
        alert(data.status);
      } else {
        console.log(data);
      }
    });
  }
}
