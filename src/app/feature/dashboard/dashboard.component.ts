import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ResumeService } from '../../core/entities/resume/resume.service';
import ResumeDto from '../../core/entities/resume/resume-dto';
import ExpenseDto from '../../core/entities/expense/expense-dto';
import { ExpenseService } from '../../core/entities/expense/expense.service';
import { catchError, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../core/entities/category/category.service';
import { CardService } from '../../core/entities/card/card.service';
import CardDto from '../../core/entities/card/card-dto';
import CategoryDto from '../../core/entities/category/category-dto';

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
  loading: boolean = false;
  expenseFormVisible: boolean = false;

  expenseFormGroup: FormGroup = new FormGroup({});

  cards: CardDto[] = [];
  categories: CategoryDto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.getExpenseFormGroup();
    this.getCards();
    this.getCategories();
    this.getResume();
    this.getExpenses();
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

  formatGridDate(date: Date): string {
    return moment(date).locale('pt-br').format('DD/MM/YYYY');
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.getResume();
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.getResume();
  }

  onChangeTab(): void {
    if (this.selectedOptionTab === 'expenses') {
      this.getExpenses();
    } else {
    }
  }

  getExpenses(): void {
    this.loading = true;
    this.expenseService
      .getExpenses(this.currentDate)
      .pipe(
        catchError(() => {
          this.loading = false;
          return [];
        })
      )
      .subscribe((expenses: ExpenseDto[]) => {
        this.expensesData = expenses;
        this.loading = false;
      });
  }

  newRegister() {
    if (this.selectedOptionTab == 'expenses') {
      this.newExpense();
    } else {
      // this.newIncome();
    }
  }

  newExpense() {
    this.getExpenseFormGroup();
    this.expenseFormVisible = true;
  }

  editExpense(expense: ExpenseDto) {
    this.expenseFormVisible = true;
    this.expenseFormGroup.patchValue(expense);
    this.expenseFormGroup
      .get('expenseDate')
      ?.setValue(moment(expense.expenseDate).toDate());
  }

  deleteExpense(expense: ExpenseDto): void {
    this.loading = true;
    this.expenseService
      .delete(expense.id)
      .pipe(
        catchError(() => {
          this.loading = false;
          return [];
        })
      )
      .subscribe(() => {
        this.getExpenses();
        this.getResume();
      });
  }

  getExpenseFormGroup(): void {
    this.expenseFormGroup = this.formBuilder.group({
      id: [undefined],
      name: [undefined, Validators.required],
      category: [undefined],
      card: [undefined],
      value: [0, Validators.required],
      expenseDate: [undefined, Validators.required],
      installments: [1, Validators.required],
    });
  }

  getCategories() {
    this.loading = true;
    this.categoryService.listAll().subscribe((data: any) => {
      this.categories = data;
      this.loading = false;
    });
  }

  getCards() {
    this.loading = true;
    this.cardService.listAll().subscribe((data: any) => {
      this.cards = data;
      this.loading = false;
    });
  }

  saveExpense(): void {
    this.validateFormGroup(this.expenseFormGroup);
    if (this.expenseFormGroup.invalid) {
      return;
    }

    let observable: Observable<any>;
    if (this.expenseFormGroup.get('id')?.value) {
      observable = this.expenseUpdateObservaable();
    } else {
      observable = this.expenseInsertObservaable();
    }
    observable.subscribe(() => {
      this.getExpenses();
      this.getResume();
      this.expenseFormVisible = false;
      this.expenseFormGroup.reset();
    });
  }

  expenseInsertObservaable() {
    return this.expenseService.insert(this.expenseFormGroup.getRawValue());
  }

  expenseUpdateObservaable() {
    return this.expenseService.update(
      this.expenseFormGroup.get('id')?.value,
      this.expenseFormGroup.getRawValue()
    );
  }

  validateFormGroup(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field: any) => {
      const control = formGroup.get(field);
      control?.updateValueAndValidity();
      control?.markAsDirty();
    });
  }
}
