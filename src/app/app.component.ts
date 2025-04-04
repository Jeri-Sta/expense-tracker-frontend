import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { ToastModule } from 'primeng/toast';
import { FeatureModule } from './feature/feature.module';
import { CategoryService } from './core/entities/category/category.service';
import { MessageService } from 'primeng/api';
import { BankService } from './core/entities/bank/bank.service';
import { CardService } from './core/entities/card/card.service';
import { ResumeService } from './core/entities/resume/resume.service';
import { ExpenseService } from './core/entities/expense/expense.service';
import { IncomeService } from './core/entities/income/income.service';
import { UserService } from './core/entities/user/user.service';
import { isLogged } from './core/auth/login-auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ComponentsModule, FeatureModule, ToastModule],
  providers: [
    CategoryService,
    BankService,
    CardService,
    MessageService,
    ResumeService,
    ExpenseService,
    IncomeService,
    UserService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'expense-tracker-frontend';

  isLogged: boolean = isLogged();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.isLogged = isLogged();
    });
  }
}
