import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
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

  public getIncome(dates: Date[]) {
    const startDate = moment(dates[0]).format('YYYY-MM-DD');
    const endDate = moment(dates[1]).format('YYYY-MM-DD');
    return this.http.get<IncomeDto[]>('http://localhost:8080/income', {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
}
