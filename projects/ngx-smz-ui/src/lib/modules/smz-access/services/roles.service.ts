import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '../../rbk-utils/http/base-api.service';
import { RolesDetails } from '../models/roles-details';
import { CreateRole } from '../models/create-role';
import { UpdateRole } from '../models/update-role';
import { UpdateRoleClaims } from '../models/update-role-claims';


@Injectable({ providedIn: 'root' })
export class RolesService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/roles`;

  constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<RolesDetails[]> {
    return this.http.get<RolesDetails[]>(`${this.endpoint}`, this.generateDefaultHeaders({}));
  }
  public create(data: CreateRole): Observable<RolesDetails> {
    return this.http.post<RolesDetails>(`${this.endpoint}`, data, this.generateDefaultHeaders({}));
  }
  public update(data: UpdateRole): Observable<RolesDetails> {
    return this.http.put<RolesDetails>(`${this.endpoint}`, data, this.generateDefaultHeaders({}));
  }
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`, this.generateDefaultHeaders({}));
  }
  public updateRoleClaims(data: UpdateRoleClaims): Observable<RolesDetails> {
    return this.http.post<RolesDetails>(`${this.endpoint}/update-claims`, data, this.generateDefaultHeaders({}));
  }
}

