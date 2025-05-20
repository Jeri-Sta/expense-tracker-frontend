import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import ExpenseDto from './expense-dto';
import moment from 'moment';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ExpenseService extends EntityService<ExpenseDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(
      http,
      messageService,
      `${environment.apiUrl}/expense`
    );
  }

  public getExpenses(date: Date) {
    return this.http.get<ExpenseDto[]>(
      `${environment.apiUrl}/expense`,
      {
        params: {
          referenceDate: moment(date).format('YYYY-MM-DD'),
        },
      }
    );
  }
}
