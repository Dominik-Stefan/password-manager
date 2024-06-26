import { Component, inject } from '@angular/core';
import { User } from '../../data_classes/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User;

  authService = inject(AuthService);

  constructor() {
    this.user = new User();
  }

  ngOnInit(): void {
    this.authService.tokenLogin();
  }

  login() {
    this.authService.login(this.user);
  }

  signup() {
    this.authService.signup(this.user);
  }
}
