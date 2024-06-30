import { Injectable, inject } from '@angular/core';
import { Account } from '../data_classes/account';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  account: Account = new Account();
  accountSubject: BehaviorSubject<Account> = new BehaviorSubject<Account>(
    new Account()
  );
  accounts: Account[] = [];
  accountsSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
    []
  );

  dataService = inject(DataService);

  constructor() {
    this.init();
  }

  init() {
    this.account = new Account();
    this.dataService.getAccounts().subscribe((accounts: any) => {
      this.accounts = [...accounts];
      this.accountsSubject.next(this.accounts);
    });
  }

  getAccounts() {
    return this.accountsSubject;
  }

  getAccount(id: string) {
    this.dataService.getAccount(id).subscribe((res: any) => {
      this.account = res;
      this.accountSubject.next(this.account);
    });
    return this.accountSubject;
  }

  addAccount(account: Account) {
    this.dataService.addAccount(account).subscribe((res: any) => {
      if (res.status == 200) {
        this.init();
      }
    });
  }

  deleteAccount(id: string) {
    this.dataService.deleteAccount(id).subscribe((res: any) => {
      if (res.status == 200) {
        this.accounts = this.accounts.filter((account) => account.id !== id);
        this.accountsSubject.next(this.accounts);
      }
    });
  }

  updateAccount(account: Account) {
    this.dataService.updateAccount(account).subscribe((res: any) => {
      if (res.status == 200) {
        this.accounts = this.accounts.map((a) => {
          if (a.id === account.id) {
            return account;
          }
          return a;
        });
        this.accountsSubject.next(this.accounts);
      }
    });
  }
}
