import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ResumeService } from '../../core/entities/resume/resume.service';
import ResumeDto from '../../core/entities/resume/resume-dto';
import ExpenseDto from '../../core/entities/expense/expense-dto';
import { IncomeComponent } from '../income/income.component';
import { ExpenseComponent } from '../expense/expense.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  resumeData?: ResumeDto;

  chart!: Chart;
  chartData: any;
  chartOptions: any;

  stateOptions: any[] = [
    { label: 'Gastos', value: 'expenses' },
    { label: 'Renda', value: 'income' },
  ];
  toggleState = 'expenses';

  @ViewChild('exExpense')
  expenseComponent!: ExpenseComponent;
  @ViewChild('exIncome')
  incomeComponent!: IncomeComponent;

  constructor(private readonly resumeService: ResumeService) {}

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
    return moment(date).locale('pt-br').format('MMM - YYYY');
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
      const categoryName = expense.category?.name ?? 'Sem categoria';
      const categoryColor = expense.category?.color ?? '#808080';

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
          borderColor: aggregatedData.map((exp) => exp.color),
        },
      ],
    };
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };
  }

  newRegister() {
    if (this.toggleState === 'expenses') {
      this.expenseComponent.newExpense();
    } else {
      this.incomeComponent.newIncome();
    }
  }
}

export default interface CategoryAggregatedDto {
  categoryName: string;
  totalValue: number;
  color?: string;
}
