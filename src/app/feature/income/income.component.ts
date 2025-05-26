import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IncomeDto from '../../core/entities/income/income-dto';
import moment from 'moment';
import { IncomeService } from '../../core/entities/income/income.service';
import { catchError, Observable } from 'rxjs';
import ColumnOptions from '../../components/table/column-options';

@Component({
  selector: 'ex-income',
  standalone: false,
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
})
export class IncomeComponent implements OnInit {
  incomeFormVisible = false;
  formGroup: FormGroup = new FormGroup({});
  incomesData: IncomeDto[] = [];
  loading: boolean = false;
  columns: ColumnOptions[] = [
    { header: 'Nome', field: 'name' },
    { header: 'Valor', field: 'value', type: 'currency' },
    { header: 'Data', field: 'incomeDate', type: 'date' },
  ];

  @Input() currentDate: Date = new Date();
  @Output() reloadResume: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private incomeService: IncomeService
  ) {}

  ngOnInit(): void {
    this.getFormGroup();
    this.getIncome();
  }

  formatGridDate(date: Date): string {
    return moment(date).locale('pt-br').format('DD/MM/YYYY');
  }

  getFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: [undefined],
      name: [undefined, Validators.required],
      value: [0, Validators.required],
      incomeDate: [undefined, Validators.required],
      createdBy: [undefined],
      lastModifiedBy: [undefined],
      createdAt: [undefined],
      updatedAt: [undefined],
    });
  }

  newIncome() {
    this.getFormGroup();
    this.incomeFormVisible = true;
  }

  editIncome(income: IncomeDto) {
    this.incomeFormVisible = true;
    this.formGroup.patchValue(income);
    this.formGroup
      .get('incomeDate')
      ?.setValue(moment(income.incomeDate).toDate());
  }

  deleteIncome(income: IncomeDto): void {
    this.loading = true;
    this.incomeService
      .delete(income.id)
      .pipe(
        catchError(() => {
          this.loading = false;
          return [];
        })
      )
      .subscribe(() => {
        this.getIncome();
        this.reloadResume.emit();
        this.incomeFormVisible = false;
      });
  }

  saveIncome(): void {
    this.validateFormGroup(this.formGroup);
    if (this.formGroup.invalid) {
      return;
    }

    let observable: Observable<any>;
    this.loading = true;
    if (this.formGroup.get('id')?.value) {
      observable = this.incomeUpdateObservaable();
    } else {
      observable = this.incomeInsertObservaable();
    }
    observable.pipe(
      catchError((error) => {
        this.loading = false;
        return error;
      })
    )
    .subscribe(() => {
      this.loading = false;
      this.getIncome();
      this.reloadResume.emit();
      this.incomeFormVisible = false;
      this.formGroup.reset();
    });
  }

  incomeInsertObservaable() {
    return this.incomeService.insert(this.formGroup.getRawValue());
  }

  incomeUpdateObservaable() {
    return this.incomeService.update(
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

  getIncome(): void {
    this.loading = true;
    this.incomeService
      .getIncome(this.currentDate)
      .pipe(
        catchError(() => {
          this.loading = false;
          return [];
        })
      )
      .subscribe((incomes: IncomeDto[]) => {
        this.incomesData = incomes;
        console.log(incomes);
        this.loading = false;
      });
  }
}
