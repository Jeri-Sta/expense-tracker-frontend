import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import CategoryDto from './category-dto';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CategoryService extends EntityService<CategoryDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(
      http,
      messageService,
      `${environment.apiUrl}/category`
    );
  }
}
