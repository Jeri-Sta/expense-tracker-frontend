import { Routes } from '@angular/router';
import { CategoryComponent } from './feature/category/category.component';
import { BankComponent } from './feature/bank/bank.component';
import { CardComponent } from './feature/card/card.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';

export const routes: Routes = [
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
    path: '',
    component: DashboardComponent,
  },
];
