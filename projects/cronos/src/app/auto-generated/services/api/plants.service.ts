import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '@ngx-smz/core';
import { Plant } from '@models/plant';


@Injectable({ providedIn: 'root' })
export class PlantsService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/plants`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  public allAsync(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.endpoint}`, this.generateDefaultHeaders({}));
  }
}

