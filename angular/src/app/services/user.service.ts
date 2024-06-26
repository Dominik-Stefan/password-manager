import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../data_classes/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = new User();

  validatePath = 'http://localhost:8081/auth/validate';

  //validatePath = '/auth/validate';

  http = inject(HttpClient);

  constructor() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);

      this.http
        .post(this.validatePath, {}, { headers: headers })
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
