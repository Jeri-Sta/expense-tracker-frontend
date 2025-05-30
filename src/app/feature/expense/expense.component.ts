import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ExpenseDto from '../../core/entities/expense/expense-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../core/entities/expense/expense.service';
import moment from 'moment';
import { catchError, Observable } from 'rxjs';
import CategoryDto from '../../core/entities/category/category-dto';
import CardDto from '../../core/entities/card/card-dto';
import { CategoryService } from '../../core/entities/category/category.service';
import { CardService } from '../../core/entities/card/card.service';
import InstallmentDto from '../../core/entities/installment/income-dto';
import ColumnOptions from '../../components/table/column-options';

@Component({
  selector: 'ex-expense',
  standalone: false,
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})
export class ExpenseComponent implements OnInit {
  expenseFormVisible = false;
  formGroup: FormGroup = new FormGroup({});
  expensesData: ExpenseDto[] = [];
  loading: boolean = false;
  cards: CardDto[] = [];
  categories: CategoryDto[] = [];
  expandedRows = {};

  columns: ColumnOptions[] = [
    { header: 'Nome', field: 'name' },
    { header: 'Categoria', field: 'category.name' },
    { header: 'Cartão', field: 'card.bank.name' },
    { header: 'Valor', field: 'value', type: 'currency' },
    { header: 'Data', field: 'expenseDate', type: 'date' },
    { header: 'Parcelas', field: 'installments' },
  ];
  columnsInstallments: ColumnOptions[] = [
    { header: 'Número', field: 'installmentNumber' },
    { header: 'Valor', field: 'value', type: 'currency' },
    { header: 'Data', field: 'installmentDate', type: 'date' },
  ];

  @Input() currentDate: Date = new Date();
  @Output() reloadResume: EventEmitter<any> = new EventEmitter();
  @Output() updateChart: EventEmitter<any> = new EventEmitter();

  constructor(
    private expenseService: ExpenseService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.getCards();
    this.getCategories();
    this.getExpenseFormGroup();
    this.getExpenses();
  }

  formatGridDate(date: Date): string {
    return moment(date).locale('pt-br').format('DD/MM/YYYY');
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
        this.updateChart.emit(this.expensesData);
      });
  }

  getExpenseFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: [undefined],
      name: [undefined, Validators.required],
      category: [undefined],
      card: [undefined],
      value: [0, Validators.required],
      expenseDate: [undefined, Validators.required],
      installments: [1, Validators.required],
      createdBy: [undefined],
      lastModifiedBy: [undefined],
      createdAt: [undefined],
      updatedAt: [undefined],
    });
  }

  newExpense() {
    this.getExpenseFormGroup();
    this.expenseFormVisible = true;
  }

  editExpense(expense: ExpenseDto) {
    this.expenseFormVisible = true;
    this.formGroup.patchValue(expense);
    this.formGroup
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
        this.reloadResume.emit();
        this.expenseFormVisible = false;
      });
  }

  saveExpense(): void {
    this.validateFormGroup(this.formGroup);
    if (this.formGroup.invalid) {
      return;
    }

    let observable: Observable<any>;
    this.loading = true;
    if (this.formGroup.get('id')?.value) {
      observable = this.expenseUpdateObservaable();
    } else {
      observable = this.expenseInsertObservaable();
    }
    observable.pipe(
      catchError((error) => {
        this.loading = false;
        return error;
      })
    )
    .subscribe(() => {
      this.loading = false;
      this.getExpenses();
      this.reloadResume.emit();
      this.expenseFormVisible = false;
      this.formGroup.reset();
    });
  }

  expenseInsertObservaable() {
    return this.expenseService.insert(this.formGroup.getRawValue());
  }

  expenseUpdateObservaable() {
    return this.expenseService.update(
      this.formGroup.get('id')?.value,
      this.formGroup.getRawValue()
    );
  }

  validateFormGroup(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field: any) => {
      const control = formGroup.get(field);
      control?.updateValueAndValidity();
      control?.markAsDirty();
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

  rowStyle(installment: InstallmentDto) {
    const currentDate = moment(this.currentDate).format('YYYY-MM');

    const installmentDate = moment(installment.installmentDate).format(
      'YYYY-MM'
    );

    if (currentDate === installmentDate) {
      return {
        color: 'var(--p-primary-950)',
        fontWeight: 'bold',
        fontStyle: 'italic',
        background: 'var(--p-primary-200)',
      };
    }
    return {};
  }
}
