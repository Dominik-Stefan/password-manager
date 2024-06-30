import { Component, inject } from '@angular/core';
import { Account } from '../../data_classes/account';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { User } from '../../data_classes/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent {
  user: User = new User();

  accounts: Account[] = [];
  accountSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
    []
  );

  constructor() {
    this.init();
  }

  userService = inject(UserService);
  accountService = inject(AccountService);

  init() {
    this.user = this.userService.getUser();
    this.accountSubject = this.accountService.getAccounts();
    this.accountSubject.subscribe((res) => {
      this.accounts = res;
    });
  }

  deleteAccount(id: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(id);
    }
  }
}
