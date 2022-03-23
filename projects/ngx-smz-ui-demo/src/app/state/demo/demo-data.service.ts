import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from 'ngx-smz-ui';
import { environment } from '../../../environments/environment';
import { DemoCreationData, DemoItem, DemoUpdateData } from '../../models/demo';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemoDataService extends BaseApiService {
  private endpoint = `${environment.domainApi}/api/demo`;

  constructor(private http: HttpClient) {
    super();
  }

  public getCountries(): Observable<DemoItem[]> {
    return this.http.get<DemoItem[]>(`${this.endpoint}/countries`, this.generateDefaultHeaders({ errorHandlingType: 'toast' }));
  }

  public getAll(): Observable<DemoItem[]> {
    return this.http.get<DemoItem[]>(`${this.endpoint}`, this.generateDefaultHeaders({ errorHandlingType: 'toast' }));
  }

  public getAllSignalRDemo(): Observable<DemoItem[]> {
    return this.http.get<DemoItem[]>(`${this.endpoint}`, this.generateDefaultHeaders({ errorHandlingType: 'toast', loadingBehavior: 'none' }))
      .pipe(
        map(x => x.map(item => ({...item, sample: Math.floor(Math.random() * 100) + 1 })))
      );
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
