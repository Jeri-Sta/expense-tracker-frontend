import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import UserDto from './user-dto';

@Injectable()
export class UserService extends EntityService<UserDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService, 'http://localhost:8083/authentication');
  }

  public register(user: UserDto) {
    return this.http.post<UserDto>(
      'http://localhost:8083/authentication/register',
      {
        ...user,
      }
    );
  }

  public login(user: UserDto) {
    return this.http.post<UserDto>(
      'http://localhost:8083/authentication/login',
      {
        ...user,
      }
    );
  }
}
