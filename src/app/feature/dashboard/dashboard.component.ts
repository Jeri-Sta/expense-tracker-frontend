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
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  periods: Date[] = [];
  resumeData?: ResumeDto;
  selectedOptionTab: string = 'expenses';
  expensesData: ExpenseDto[] = [];
  incomesData: IncomeDto[] = [];
  loading: boolean = false;
  expenseFormVisible: boolean = false;
  incomeFormVisible: boolean = false;

  expenseFormGroup: FormGroup = new FormGroup({});
  incomeFormGroup: FormGroup = new FormGroup({});

  @ViewChild('exExpense')
  expenseComponent!: ExpenseComponent;
  @ViewChild('exIncome')
  incomeComponent!: IncomeComponent;
  @ViewChild('datePicker')
  datePicker!: DatePicker;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.getResume();
    this.setDefaultDate();
  }

  setDefaultDate(): void {
    const start = new Date();
    const end = new Date();
    start.setDate(8);
    end.setDate(7);
    end.setMonth(start.getMonth() + 1);

    this.periods = [start, end];
  }

  getResume() {
    this.resumeService
      .getResume(this.periods)
      .subscribe((resume: ResumeDto) => {
        this.resumeData = resume;
      });
  }

  formatDate(date: Date): string {
    return moment(date).locale('pt-br').format('MMM/YYYY');
  }

  nextMonth(): void {
    this.periods.forEach((date) => {
      date.setMonth(date.getMonth() + 1);
    });
    this.datePicker.updateInputfield();

    this.getResume();
    this.expenseComponent.getExpenses();
    this.incomeComponent.getIncome();
  }

  previousMonth(): void {
    this.periods.forEach((date) => {
      date.setMonth(date.getMonth() - 1);
    });
    this.datePicker.updateInputfield();

    this.getResume();
    this.expenseComponent.getExpenses();
    this.incomeComponent.getIncome();
  }

  onCloseDatePicker() {
    if (this.periods.length > 0) {
      this.getResume();
      if (this.selectedOptionTab == 'expenses')
        this.expenseComponent.getExpenses();
      if (this.selectedOptionTab == 'incomes') this.incomeComponent.getIncome();
    }
  }
}
