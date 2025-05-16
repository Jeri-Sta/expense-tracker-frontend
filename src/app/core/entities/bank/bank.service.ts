import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import BankDto from './bank-dto';
import { environment } from '../../../../environments/environment';

@Injectable()
export class BankService extends EntityService<BankDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService, `${environment.apiUrl}/bank`);
  }
}
