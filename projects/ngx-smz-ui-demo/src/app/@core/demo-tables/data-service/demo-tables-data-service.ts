import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { demoTablesMockData } from './demo-tables-mock-data';

@Injectable()
export class DemoTableDataService {
  constructor(private http: HttpClient) { }

  getCustomersLarge() {
    return of(demoTablesMockData).pipe(
      map(x => x.data as any[]),
      map(x => x.map(item => ({ ...item, date: new Date(item.date) })))
    );
  }
}

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: number;
  country?: Country;
  company?: string;
  date?: Date;
  status?: string;
  representative?: Representative;
}