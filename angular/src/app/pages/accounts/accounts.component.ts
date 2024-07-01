import { Component, inject } from '@angular/core';
import { Account } from '../../data_classes/account';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { User } from '../../data_classes/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent {
  visible: boolean = false;

  user: User = new User();

  accounts: Account[] = [];
  accountsSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
    []
  );

  constructor() {
    this.init();
  }

  router = inject(Router);
  userService = inject(UserService);
  accountService = inject(AccountService);

  init() {
    this.user = this.userService.getUser();
    this.accountsSubject = this.accountService.getAccounts();
    this.accountsSubject.subscribe((res) => {
      this.accounts = res;
    });
  }

  deleteAccount(id: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(id);
    }
  }

  goToAdd() {
    this.router.navigate(['new', 'account']);
  }

  goToEdit(id: string) {
    this.router.navigate(['update', { type: 'account', id: id }]);
  }

  toggleVisibility() {
    this.visible = !this.visible;
  }
}
