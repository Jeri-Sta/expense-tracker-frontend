import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ResumeService } from '../../core/entities/resume/resume.service';
import ResumeDto from '../../core/entities/resume/resume-dto';
import ExpenseDto from '../../core/entities/expense/expense-dto';
import { FormGroup } from '@angular/forms';
import IncomeDto from '../../core/entities/income/income-dto';
import { IncomeComponent } from '../income/income.component';
import { ExpenseComponent } from '../expense/expense.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  resumeData?: ResumeDto;
  selectedOptionTab: string = 'expenses';
  expensesData: ExpenseDto[] = [];
  incomesData: IncomeDto[] = [];
  loading: boolean = false;
  expenseFormVisible: boolean = false;
  incomeFormVisible: boolean = false;

  expenseFormGroup: FormGroup = new FormGroup({});
  incomeFormGroup: FormGroup = new FormGroup({});

  @ViewChild('exIcome')
  incomeComponent!: IncomeComponent;
  @ViewChild('exExpense')
  expenseComponent!: ExpenseComponent;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.getResume();
  }

  getResume() {
    this.resumeService
      .getResume(this.currentDate)
      .subscribe((resume: ResumeDto) => {
        this.resumeData = resume;
      });
  }

  formatDate(date: Date): string {
    return moment(date).locale('pt-br').format('MMM/YYYY');
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.getResume();
    this.expenseComponent.getExpenses();
    this.incomeComponent.getIncome();
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.getResume();
    this.expenseComponent.getExpenses();
    this.incomeComponent.getIncome();
  }

  onChangeTab(): void {
    if (this.selectedOptionTab === 'expenses') {
      this.expenseComponent.getExpenses();
    } else {
      this.incomeComponent.getIncome();
    }
  }
}
