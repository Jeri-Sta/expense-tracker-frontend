import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import moment from 'moment';
import IncomeDto from './income-dto';
import { environment } from '../../../../environments/environment';

@Injectable()
export class IncomeService extends EntityService<IncomeDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService, `${environment.apiUrl}/expense-tracker/income`);
  }

  public getIncome(date: Date) {
    return this.http.get<IncomeDto[]>(
      `${environment.apiUrl}/expense-tracker/income`,
      {
        params: {
          referenceDate: moment(date).format('YYYY-MM-DD'),
        },
      }
    );
  }
}
