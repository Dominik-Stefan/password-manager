import { Component } from '@angular/core';
import { User } from '../../data_classes/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User;
  constructor(private router: Router, private http: HttpClient) {
    this.user = new User();
  }

  login() {
    this.http
      .post('http://localhost:8081/auth/login', this.user)
      .subscribe((data: any) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/dashboard']);
        } else if (data.status) {
          alert(data.status);
        } else {
          console.log(data);
        }
      });
  }

  signup() {
    this.http
      .post('http://localhost:8081/auth/register', this.user)
      .subscribe((data: any) => {
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
