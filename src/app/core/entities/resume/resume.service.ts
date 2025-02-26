import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import ResumeDto from './resume-dto';
import moment from 'moment';

@Injectable()
export class ResumeService extends EntityService<ResumeDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService, 'http://localhost:8080/resume');
  }

  public getResume(dates: Date[]) {
    const startDate = moment(dates[0]).format('YYYY-MM-DD');
    const endDate = moment(dates[1]).format('YYYY-MM-DD');
    return this.http.post<ResumeDto>('http://localhost:8080/resume', {
      startDate,
      endDate,
    });
  }
}
