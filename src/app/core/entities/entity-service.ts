import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService, SortMeta } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export class EntityService<T> {
  constructor(
    protected http: HttpClient,
    protected messageService: MessageService,
    protected entityUrl: string
  ) {
    this.http = http;
    this.messageService = messageService;
    this.entityUrl = entityUrl;

    this.defaultCatch = this.defaultCatch.bind(this);
  }

  public getListQueryParams(listParams: ListParams) {
    const {
      page = 0,
      size = 10,
      sort = [],
      filterQuery = '',
      displayFields = [],
    } = listParams;

    let params = new HttpParams();
    params = params.append('size', String(size));
    params = params.append('page', String(page));

    if (sort && sort.length) {
      params = params.append(
        'sort',
        sort
          .map((s) => {
            let sort = '';
            if (s.order === 1) sort = ',asc';
            else if (s.order === -1) sort = ',desc';
            return `${s.field}${sort}`;
          })
          .join(', ')
      );
    }

    if (filterQuery) params = params.append('filter', filterQuery);

    if (displayFields && displayFields.length)
      params = params.append('displayfields', displayFields.join());

    return params;
  }

  private getBodyParams(listParams: ListParams): BodyParams {
    const {
      page = 0,
      size = 10,
      sort = [],
      filterQuery = '',
      displayFields = [],
    } = listParams;
    const bodyParams: BodyParams = {};

    bodyParams.size = size;
    bodyParams.offset = page;

    if (sort && sort.length) {
      bodyParams.sort = sort
        .map((s) => {
          let sort = '';
          if (s.order === 1) sort = ',asc';
          else if (s.order === -1) sort = ',desc';
          return `${s.field}${sort}`;
        })
        .join(', ');
    }

    if (filterQuery) bodyParams.filter = filterQuery;

    if (displayFields && displayFields.length)
      bodyParams.displayfields = displayFields.join();

    return bodyParams;
  }

  public list(listParams: ListParams) {
    return this.http
      .get<T[]>(this.entityUrl, { params: this.getListQueryParams(listParams) })
      .pipe(this.defaultCatch());
  }

  public listAll() {
    return this.http
      .get<T[]>(`${this.entityUrl}/listAll`)
      .pipe(this.defaultCatch());
  }

  public insert(entity: T) {
    return this.http
      .post<T>(`${this.entityUrl}`, entity)
      .pipe(this.defaultCatch());
  }

  public update(id: any, entity: T) {
    return this.http
      .put<T>(`${this.entityUrl}/${id}`, entity)
      .pipe(this.defaultCatch());
  }

  public delete(id: any) {
    return this.http
      .delete<T>(`${this.entityUrl}/${id}`)
      .pipe(this.defaultCatch());
  }

  public defaultCatch() {
    return catchError((err: any) => {
      if (err) {
        let summary = 'Erro';
        let detail = err.message || 'Error';

        if (err.status === 401) {
          summary = 'Não autorizado';
          detail = 'Você não possui permissão para essa ação';
        }

        this.messageService.add({
          severity: 'error',
          summary,
          detail,
        });
      }

      return throwError(() => new Error(err.message));
    });
  }
}

export interface ListParams {
  page?: number;
  size?: number;
  sort?: SortMeta[];
  filterQuery?: string;
  displayFields?: string[];
}

export interface BodyParams {
  offset?: number;
  size?: number;
  sort?: string;
  filter?: string;
  displayfields?: string;
}
