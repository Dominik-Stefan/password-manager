import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CardsComponent } from './pages/cards/cards.component';
import { NotesComponent } from './pages/notes/notes.component';
import { AddComponent } from './pages/add/add.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'cards',
        component: CardsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'notes',
        component: NotesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'new/:id',
        component: AddComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
