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

  public getExpenses(dates: Date[]) {
    const startDate = moment(dates[0]).format('YYYY-MM-DD');
    const endDate = moment(dates[1]).format('YYYY-MM-DD');
    return this.http.get<ExpenseDto[]>('http://localhost:8080/expense', {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
}
