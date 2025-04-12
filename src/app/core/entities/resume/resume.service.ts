import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import ResumeDto from './resume-dto';
import moment from 'moment';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ResumeService extends EntityService<ResumeDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService, `${environment.apiUrl}/expense-tracker/resume`);
  }

  public getResume(date: Date) {
    const currentDate = moment(date).format('YYYY-MM-DD');
    return this.http.post<ResumeDto>(
      `${environment.apiUrl}/expense-tracker/resume`,
      {
        currentDate,
      }
    );
  }
}
