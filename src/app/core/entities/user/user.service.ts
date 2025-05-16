import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service';
import { MessageService } from 'primeng/api';
import UserDto from './user-dto';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService extends EntityService<UserDto> {
  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService, `${environment.apiUrl}/auth`);
  }

  public register(user: UserDto) {
    return this.http.post<UserDto>(
      `${environment.apiUrl}/auth/register`,
      {
        ...user,
      }
    );
  }

  public login(user: UserDto) {
    return this.http.post<UserDto>(
      `${environment.apiUrl}/auth/login`,
      {
        ...user,
      }
    );
  }
}
