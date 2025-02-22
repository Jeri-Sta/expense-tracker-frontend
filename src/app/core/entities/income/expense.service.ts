import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import ExpenseDto from './income-dto';
import moment from 'moment';
import IncomeDto from './income-dto';

@Injectable()
export class IncomeService extends EntityService<IncomeDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService, 'http://localhost:8080/income');
  }

  public getIncome(date: Date) {
    return this.http.get<IncomeDto[]>('http://localhost:8080/income', {
      params: {
        referenceDate: moment(date).format('YYYY-MM-DD'),
      },
    });
  }
}
