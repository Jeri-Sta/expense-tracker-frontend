import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/entities/category/category.service';
import CategoryDto from '../../core/entities/category/category-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import BankDto from '../../core/entities/bank/bank-dto';
import { BankService } from '../../core/entities/bank/bank.service';

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
  totalRecords: number = 0;
  loading: boolean = true;
  pageSize: number = 10;

  constructor(
    private bankService: BankService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
    this.getBank();
  }

  getBank(event?: any) {
    this.loading = true;
    let paramList = {
      page: 0,
      size: this.pageSize,
      sort: [
        {
          field: 'name',
          order: 1,
        },
      ],
    };
    if (event) {
      const page = event.first! / event.rows!;
      const size = event.rows!;
      paramList = {
        ...paramList,
        page: page,
        size: size,
      };
    }
    this.bankService.list(paramList).subscribe((data: any) => {
      this.data = data.content;
      this.totalRecords = data.totalElements;
      this.loading = false;
    });
  }

  private getFormGroup() {
    return this.formBuilder.group({
      id: [undefined],
      name: [undefined, Validators.required],
      balance: [0.0],
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
    this.bankService.delete(bank.id).subscribe((data) => {
      this.formVisible = false;
      this.getBank();
    });
  }

  saveBank() {
    this.validateFormGroup(this.formGroup);
    if (this.formGroup.invalid) {
      return;
    }

    let observable: Observable<any>;
    if (this.formGroup.get('id')?.value) {
      observable = this.updateObservaable();
    } else {
      observable = this.insertObservaable();
    }
    observable.subscribe((data) => {
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

  onPageChange(event: any) {
    console.log(event);
  }
}
