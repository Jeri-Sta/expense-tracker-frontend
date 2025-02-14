import { Routes } from '@angular/router';
import { CategoryComponent } from './feature/category/category.component';
import { BankComponent } from './feature/bank/bank.component';

export const routes: Routes = [
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'bank',
    component: BankComponent,
  },
];
