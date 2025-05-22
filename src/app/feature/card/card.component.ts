import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable } from 'rxjs';
import CardDto from '../../core/entities/card/card-dto';
import { CardService } from '../../core/entities/card/card.service';
import BankDto from '../../core/entities/bank/bank-dto';
import { BankService } from '../../core/entities/bank/bank.service';
import ColumnOptions from '../../components/table/column-options';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: false,
})
export class CardComponent implements OnInit {
  data: CardDto[] = [];
  banks: BankDto[] = [];
  formVisible = false;
  formGroup!: FormGroup;
  loading: boolean = true;
  columns: ColumnOptions[] = [
    { header: 'Banco', field: 'bank.name' },
    { header: 'Limite', field: 'limit' },
    { header: 'Dia de fechamento', field: 'closingDay' },
  ];

  constructor(
    private cardService: CardService,
    private formBuilder: FormBuilder,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
    this.getCard();
    this.getBanks();
  }

  getBanks() {
    this.loading = true;
    this.bankService.listAll().subscribe((data: any) => {
      this.banks = data;
      this.loading = false;
    });
  }

  getCard() {
    this.loading = true;
    this.cardService.listAll().subscribe((data: any) => {
      this.data = data;
      this.loading = false;
    });
  }

  private getFormGroup() {
    return this.formBuilder.group({
      id: [undefined],
      bank: [undefined, Validators.required],
      limit: [undefined, Validators.required],
      closingDay: [undefined, Validators.required],
      createdBy: [undefined],
      lastModifiedBy: [undefined],
      createdAt: [undefined],
      updatedAt: [undefined],
    });
  }

  newCard() {
    this.formGroup = this.getFormGroup();
    this.formVisible = true;
  }

  editCard(card: CardDto) {
    this.formVisible = true;
    this.formGroup.patchValue(card);
  }

  deleteCard(card: CardDto) {
    this.cardService.delete(card.id).subscribe((data) => {
      this.formVisible = false;
      this.getCard();
    });
  }

  saveCard() {
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
    )
    .subscribe((data) => {
      this.loading = false;
      this.getCard();
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
    return this.cardService.insert(this.formGroup.getRawValue());
  }

  updateObservaable() {
    return this.cardService.update(
      this.formGroup.get('id')?.value,
      this.formGroup.getRawValue()
    );
  }

  getFormatedDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
