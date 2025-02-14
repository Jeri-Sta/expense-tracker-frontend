import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import CardDto from '../../core/entities/card/card-dto';
import { CardService } from '../../core/entities/card/card.service';
import moment from 'moment';
import BankDto from '../../core/entities/bank/bank-dto';
import { BankService } from '../../core/entities/bank/bank.service';

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
  totalRecords: number = 0;
  loading: boolean = true;
  pageSize: number = 10;

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

  getCard(event?: any) {
    this.loading = true;
    let paramList = {
      page: 0,
      size: this.pageSize,
      sort: [
        {
          field: 'bank.name',
          order: 1,
        },
      ],
    };
    if (event) {
      const page = event.first! / event.rows!; // Calcula a página com base no primeiro registro
      const size = event.rows!;
      paramList = {
        ...paramList,
        page: page,
        size: size,
      };
    }
    this.cardService.list(paramList).subscribe((data: any) => {
      this.data = data.content;
      this.data.forEach((element: any) => {
        element.closingDate = moment(element.closingDate).format('DD/MM/YYYY');
      });
      this.totalRecords = data.totalElements; // Define o total de registros para paginação
      this.loading = false;
    });
  }

  private getFormGroup() {
    return this.formBuilder.group({
      id: [undefined],
      bank: [undefined, Validators.required],
      limit: [undefined, Validators.required],
      closingDate: [undefined, Validators.required],
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

    let observable: Observable<any>;
    if (this.formGroup.get('id')?.value) {
      observable = this.updateObservaable();
    } else {
      observable = this.insertObservaable();
    }
    observable.subscribe((data) => {
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

  onPageChange(event: any) {
    console.log(event);
  }

  getFormatedDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
