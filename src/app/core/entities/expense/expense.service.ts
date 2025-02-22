import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import ExpenseDto from './expense-dto';
import moment from 'moment';

@Injectable()
export class ExpenseService extends EntityService<ExpenseDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService, 'http://localhost:8080/expense');
  }

  public getExpenses(date: Date) {
    return this.http.get<ExpenseDto[]>('http://localhost:8080/expense', {
      params: {
        referenceDate: moment(date).format('YYYY-MM-DD'),
      },
    });
  }
}
