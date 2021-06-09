import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from 'ngx-rbk-utils';
import { environment } from 'projects/ngx-smz-ui-demo/src/environments/environment';
import { DemoCreationData, DemoItem, DemoUpdateData } from '../../models/demo';
import { SimpleNamedEntity } from 'ngx-smz-dialogs';

@Injectable({ providedIn: 'root' })
export class DemoDataService extends BaseApiService {
  private endpoint = `${environment.domainApi}/api/demo`;

  constructor(private http: HttpClient) {
    super();
  }

  public getCountries(): Observable<SimpleNamedEntity[]> {
    return this.http.get<SimpleNamedEntity[]>(`${this.endpoint}/countries`, this.generateDefaultHeaders({ errorHandlingType: 'toast' }));
  }

  public getAll(): Observable<DemoItem[]> {
    return this.http.get<DemoItem[]>(`${this.endpoint}`, this.generateDefaultHeaders({ errorHandlingType: 'toast' }));
  }

  public create(data: DemoCreationData): Observable<DemoItem> {
    return this.http.post<DemoItem>(`${this.endpoint}`, data, this.generateDefaultHeaders({ errorHandlingType: 'toast' }));
  }

  public update(data: DemoUpdateData): Observable<DemoItem> {
    return this.http.put<DemoItem>(`${this.endpoint}`, data, this.generateDefaultHeaders({ errorHandlingType: 'toast' }));
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`, this.generateDefaultHeaders({ errorHandlingType: 'toast' }));
  }

}
