import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../data_classes/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = new User();

  http = inject(HttpClient);

  constructor() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);

      this.http
        .post(environment.validateUrl, {}, { headers: headers })
        .subscribe((data: any) => {
          if (data.status == 'ok') {
            this.user = data.user;
          } else if (data.status == 401) {
            alert(data.message);
          } else {
            console.log(data);
          }
        });
    }
  }

  getUser() {
    return this.user;
  }
}
