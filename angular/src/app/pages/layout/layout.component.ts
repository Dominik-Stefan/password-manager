import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  authServicve = inject(AuthService);
  router = inject(Router);
  logout() {
    this.authServicve.logout();
  }

  goToAccounts() {
    this.router.navigate(['/accounts']);
  }
  goToCards() {
    this.router.navigate(['/cards']);
  }
  goToNotes() {
    this.router.navigate(['/notes']);
  }
}
