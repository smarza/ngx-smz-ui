import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '../../rbk-utils/http/base-api.service';
import { ClaimDetails } from '../models/claim-details';
import { CreateClaim } from '../models/create-claim';
import { UpdateClaim } from '../models/update-claim';


@Injectable({ providedIn: 'root' })
export class ClaimsService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/claims`;

  constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<ClaimDetails[]> {
    return this.http.get<ClaimDetails[]>(`${this.endpoint}`, this.generateDefaultHeaders({}));
  }
  public create(data: CreateClaim): Observable<ClaimDetails> {
    return this.http.post<ClaimDetails>(`${this.endpoint}`, data, this.generateDefaultHeaders({}));
  }
  public update(data: UpdateClaim): Observable<ClaimDetails> {
    return this.http.put<ClaimDetails>(`${this.endpoint}`, data, this.generateDefaultHeaders({}));
  }
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`, this.generateDefaultHeaders({}));
  }
}

