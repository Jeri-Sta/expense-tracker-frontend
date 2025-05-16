import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import CardDto from './card-dto';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CardService extends EntityService<CardDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService, `${environment.apiUrl}/card`);
  }
}
