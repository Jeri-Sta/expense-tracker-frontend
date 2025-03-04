import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
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
  currentDate: Date = new Date();
  resumeData?: ResumeDto;

  chartData: any;
  chartOptions: any;

  @ViewChild('exExpense')
  expenseComponent!: ExpenseComponent;
  @ViewChild('exIncome')
  incomeComponent!: IncomeComponent;

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

  setChart(data: ExpenseDto[]) {
    const groupedExpenses = data.reduce((acc, expense) => {
      const categoryName = expense.category?.name || 'Uncategorized';
      const categoryColor = expense.category?.color;

      const valueToUse =
        expense.installmentsRegisters.length > 0
          ? expense.installmentsRegisters[0].value
          : expense.value;

      if (!acc[categoryName]) {
        acc[categoryName] = {
          categoryName: categoryName,
          totalValue: valueToUse,
          color: categoryColor,
        };
      } else {
        acc[categoryName].totalValue += valueToUse;
      }

      return acc;
    }, {} as Record<string, CategoryAggregatedDto>);

    const aggregatedData = Object.values(groupedExpenses);

    this.chartData = {
      labels: aggregatedData.map((exp) => exp.categoryName),
      datasets: [
        {
          data: aggregatedData.map((exp) => exp.totalValue),
          backgroundColor: aggregatedData.map((exp) => exp.color),
        },
      ],
    };
  }
}

export default interface CategoryAggregatedDto {
  categoryName: string;
  totalValue: number;
  color?: string;
}
