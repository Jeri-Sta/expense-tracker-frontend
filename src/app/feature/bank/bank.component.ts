import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable } from 'rxjs';
import BankDto from '../../core/entities/bank/bank-dto';
import { BankService } from '../../core/entities/bank/bank.service';
import ColumnOptions from '../../components/table/column-options';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css',
  standalone: false,
})
export class BankComponent implements OnInit {
  data: BankDto[] = [];
  formVisible = false;
  formGroup!: FormGroup;
  loading: boolean = true;
  columns: ColumnOptions[] = [
    { header: 'Nome', field: 'name' },
    { header: 'Saldo', field: 'balance' },
  ];

  constructor(
    private bankService: BankService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
    this.getBank();
  }

  getBank() {
    this.loading = true;
    this.bankService.listAll().subscribe((data: any) => {
      this.data = data;
      this.loading = false;
    });
  }

  private getFormGroup() {
    return this.formBuilder.group({
      id: [undefined],
      name: [undefined, Validators.required],
      balance: [0.0],
      createdBy: [undefined],
      lastModifiedBy: [undefined],
      createdAt: [undefined],
      updatedAt: [undefined],
    });
  }

  newBank() {
    this.formGroup = this.getFormGroup();
    this.formVisible = true;
  }

  editBank(bank: BankDto) {
    this.formVisible = true;
    this.formGroup.patchValue(bank);
  }

  deleteBank(bank: BankDto) {
    this.bankService.delete(bank.id)
    .subscribe((data) => {
      this.loading = false;
      this.formVisible = false;
      this.getBank();
    });
  }

  saveBank() {
    this.validateFormGroup(this.formGroup);
    if (this.formGroup.invalid) {
      return;
    }
    this.loading = true;
    let observable: Observable<any>;
    if (this.formGroup.get('id')?.value) {
      observable = this.updateObservaable();
    } else {
      observable = this.insertObservaable();
    }
    observable.pipe(
      catchError((error) => {
        this.loading = false;
        return error;
      })
    ).subscribe(() => {
      this.loading = false;
      this.getBank();
      this.formVisible = false;
      this.formGroup.reset();
    });
  }

  validateFormGroup(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field: any) => {
      const control = formGroup.get(field);
      control?.updateValueAndValidity();
      control?.markAsDirty();
    });
  }

  insertObservaable() {
    return this.bankService.insert(this.formGroup.getRawValue());
  }

  updateObservaable() {
    return this.bankService.update(
      this.formGroup.get('id')?.value,
      this.formGroup.getRawValue()
    );
  }
}
