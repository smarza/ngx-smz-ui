import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '@ngx-smz/core';
import { Inspection } from '@models/inspection';


@Injectable({ providedIn: 'root' })
export class GiantsService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/giants`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAllTopsideInspectionsAsync(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(`${this.endpoint}/inspections`, this.generateDefaultHeaders({}));
  }
}

