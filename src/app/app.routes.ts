import { Routes } from '@angular/router';
import { CategoryComponent } from './feature/category/category.component';
import { BankComponent } from './feature/bank/bank.component';
import { CardComponent } from './feature/card/card.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { AuthenticationComponent } from './feature/login/authentication.component';
import { LoginFormComponent } from './feature/login/login-form/login-form.component';
import { PasswordRecoveryFormComponent } from './feature/login/password-recovery-form/password-recovery-form.component';
import { RegisterFormComponent } from './feature/login/register-form/register-form.component';
import {
  canActivateGeneral,
  canActiveLogin,
} from './core/auth/login-auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateGeneral],
    children: [
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'bank',
        component: BankComponent,
      },
      {
        path: 'card',
        component: CardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    canActivate: [canActiveLogin],
    children: [
      {
        path: '',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      },
      {
        path: 'recovery',
        component: PasswordRecoveryFormComponent,
      },
      {
        path: 'confirmation',
        component: AuthenticationComponent,
      },
    ],
  },
];
