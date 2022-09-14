import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '../../rbk-utils/http/base-api.service';
import { UpdateUserRoles } from '../models/update-user-roles';
import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';
import { AddClaimToUser } from '../models/add-claim-to-user';
import { RemoveClaimFromUser } from '../models/remove-claim-from-user';
import { ClaimOverride } from '../models/claim-override';



@Injectable({ providedIn: 'root' })
export class AccessService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/access`;

  constructor(private http: HttpClient) {
    super();
  }

  public updateUserRoles(data: UpdateUserRoles): Observable<SimpleNamedEntity[]> {
    return this.http.post<SimpleNamedEntity[]>(`${this.endpoint}/update-roles`, data, this.generateDefaultHeaders({}));
  }
  public addClaimToUser(data: AddClaimToUser): Observable<ClaimOverride[]> {
    return this.http.post<ClaimOverride[]>(`${this.endpoint}/add-claim`, data, this.generateDefaultHeaders({}));
  }
  public removeClaimFromUser(data: RemoveClaimFromUser): Observable<ClaimOverride[]> {
    return this.http.post<ClaimOverride[]>(`${this.endpoint}/remove-claim`, data, this.generateDefaultHeaders({}));
  }
}

