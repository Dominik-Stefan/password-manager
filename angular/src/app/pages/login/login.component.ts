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

  loginPath = 'http://localhost:8081/auth/login';
  signupPath = 'http://localhost:8081/auth/register';

  //loginPath = '/auth/login';
  //signupPath = '/auth/register';

  constructor(private router: Router, private http: HttpClient) {
    this.user = new User();
  }

  login() {
    this.http.post(this.loginPath, this.user).subscribe((data: any) => {
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
    this.http.post(this.signupPath, this.user).subscribe((data: any) => {
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
