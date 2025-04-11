import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import CategoryDto from './category-dto';
import { MessageService } from 'primeng/api';

@Injectable()
export class CategoryService extends EntityService<CategoryDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(
      http,
      messageService,
      'http://localhost:8083/expense-tracker/category'
    );
  }
}
