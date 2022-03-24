import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from 'ngx-smz-ui';
import { environment } from '../../../environments/environment';
import { DemoCreationData, DemoItem, DemoUpdateData } from '../../models/demo';
import { map, of } from 'rxjs';
import { EasyTableDemoData } from '../../ui/features/demo-tables/demo-easy-table/easy-table-model';

const status = [
  { id: 'delivered', name: 'Delivered' },
  { id: 'cancelled', name: 'Cancelled' },
  { id: 'processing', name: 'Processing' }
]

@Injectable({ providedIn: 'root' })
export class DemoDataService extends BaseApiService {
  private endpoint = `${environment.domainApi}/api/demo`;
  private mockData: EasyTableDemoData[] = [];

  constructor(private http: HttpClient) {
    super();

    for (let index = 0; index < 1000; index++) {
      const total = Math.floor(Math.random() * 3000) + 1;
      const number = Math.floor(Math.random() * 200) + 100;
      const statusIndex = Math.floor(Math.random() * status.length) + 0;

      this.mockData.push(
        { id: index.toString(), number, details: 'Kring New Fit office chair, mesh + PU, black', status: status[statusIndex], date: new Date(), total}
      );

    }
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

  public getAllEasyTableDemo(): Observable<EasyTableDemoData[]> {
    return of(this.mockData)
      .pipe(
        map(x => x.map(item => {
          const updateStatus = (Math.floor(Math.random() * 100) + 1) > 95;
          const statusIndex = updateStatus ? Math.floor(Math.random() * status.length) + 0 : 0;

          return {...item, status: updateStatus ? status[statusIndex] : item.status, total: Math.floor(Math.random() * 3000) + 1 }
        }))
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
