import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { SimpleNamedEntity } from 'ngx-smz-ui';
import { DemoCreationData, DemoItem, DemoUpdateData } from '../../models/demo';
import { TreeNode } from 'primeng/api/treenode';

const DUMMY_COUNTRIES: SimpleNamedEntity[] = [
  { id: '209de553-37ce-4293-9644-64436fde2b6e', name: 'Paris 1' },
  { id: '209de553-37ce-4293-9644-64436fde2b6f', name: 'Paris 2' },
  { id: '209de553-37ce-4293-9644-64436fde2b6g', name: 'Paris 3' },
  { id: '209de553-37ce-4293-9644-64436fde2b6h', name: 'Paris 4' },
  { id: '209de553-37ce-4293-9644-64436fde2b6i', name: 'Paris 5' },
  { id: '209de553-37ce-4293-9644-64436fde2b6j', name: 'Paris 6' },
  { id: '209de553-37ce-4293-9644-64436fde2b6l', name: 'Paris 7' },
  { id: '209de553-37ce-4293-9644-64436fde2b6k', name: 'Paris 8' },
];

const DUMMY_ITEMS: DemoItem[] = [
  { id: '16a6064f-780f-4a29-a4cb-42f5d6fd7964', name: 'Name A', company: 'ACME Inc 1', country: DUMMY_COUNTRIES[0], roles: [] },
  { id: '74992fc1-b2e3-4550-9c83-70bc7ebbd52a', name: 'Name B', company: 'ACME Inc 2', country: DUMMY_COUNTRIES[1], roles: [] },
  { id: '5dcbb315-c0a6-44e8-8bb0-735fad05322d', name: 'Name C', company: 'ACME Inc 3', country: DUMMY_COUNTRIES[2], roles: [] },
  { id: '16a6064f-780f-4a29-a4cb-42f5d6fd7965', name: 'Name D Bruce', company: 'ACME Inc 4', country: DUMMY_COUNTRIES[5], roles: [] },
  { id: '16a6064f-780f-4a29-a4cb-42f5d6fd7966', name: 'Name D Bruce', company: 'ACME Inc 5', country: DUMMY_COUNTRIES[6], roles: [] },
  { id: '16a6064f-780f-4a29-a4cb-42f5d6fd7967', name: 'Name D Bruce', company: 'ACME Inc 6', country: DUMMY_COUNTRIES[7], roles: [] },
  { id: '74992fc1-b2e3-4550-9c83-70bc7ebbd527', name: 'Name E', company: 'ACME Inc 5', country: DUMMY_COUNTRIES[4], roles: [] },
  { id: '5dcbb315-c0a6-44e8-8bb0-735fad053229', name: 'Name F', company: 'ACME Inc 6', country: DUMMY_COUNTRIES[3], roles: [] },
];

@Injectable({ providedIn: 'root' })
export class DemoDataService {
  constructor(private http: HttpClient) {}

  public getCountries(): Observable<SimpleNamedEntity[]> {
    return of([...DUMMY_COUNTRIES]);
  }

  public getAll(): Observable<DemoItem[]> {
    return of(DUMMY_ITEMS.map(item => ({ ...item, country: { ...item.country } })));
  }

  public create(data: DemoCreationData): Observable<DemoItem> {
    const country = DUMMY_COUNTRIES.find(item => item.id === data.countryId) ?? DUMMY_COUNTRIES[0];

    const createdItem: DemoItem = {
      id: crypto.randomUUID(),
      name: data.name,
      company: data.company,
      country: { ...country },
      roles: [],
    };

    return of(createdItem);
  }

  public update(data: DemoUpdateData): Observable<DemoItem> {
    const country = DUMMY_COUNTRIES.find(item => item.id === data.countryId) ?? DUMMY_COUNTRIES[0];

    const updatedItem: DemoItem = {
      id: data.id,
      name: data.name,
      company: data.company,
      country: { ...country },
      roles: [],
    };

    return of(updatedItem);
  }

  public remove(id: string): Observable<void> {
    if (id === 'erro') {
      return throwError(() => new Error('Simulated remove failure'));
    }

    return of(void 0);
  }

  public getTree(): Observable<TreeNode[]> {
    return this.http.get<{ data: TreeNode[] }>('assets/files_temp.json').pipe(map(response => response.data));
  }
}
