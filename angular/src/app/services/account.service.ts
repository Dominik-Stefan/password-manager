import { Injectable, inject } from '@angular/core';
import { Account } from '../data_classes/account';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accounts: Account[] = [];
  accountSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
    []
  );

  dataService = inject(DataService);

  constructor() {
    this.init();
  }

  init() {
    this.dataService.getAccounts().subscribe((accounts: any) => {
      this.accounts = [...accounts];
      this.accountSubject.next(this.accounts);
    });
  }

  getAccounts() {
    return this.accountSubject;
  }

  addAccount(account: Account) {
    this.dataService.addAccount(account).subscribe((account: any) => {
      this.accounts = [...this.accounts, account];
      this.accountSubject.next(this.accounts);
    });
  }

  deleteAccount(id: string) {
    this.dataService.deleteAccount(id).subscribe((res: any) => {
      if (res.status == 200) {
        this.accounts = this.accounts.filter((account) => account.id !== id);
        this.accountSubject.next(this.accounts);
      }
    });
  }

  updateAccount(account: Account) {
    this.dataService.updateAccount(account).subscribe((account: any) => {
      this.accounts = this.accounts.map((a) => {
        if (a.id === account.id) {
          return account;
        }
        return a;
      });
      this.accountSubject.next(this.accounts);
    });
  }
}
