import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ClaimDetails } from '../models/claim-details';
import { RolesDetails } from '../models/roles-details';
import { UserDetails } from '../models/user-details';
import { TenantDetails } from '../models/tenant-details';
import { CreateClaim } from '../models/create-claim';
import { UpdateClaim } from '../models/update-claim';
import { ProtectClaim } from '../models/protect-claim';
import { UnprotectClaim } from '../models/unprotect-claim';
import { CreateRole } from '../models/create-role';
import { RenameRole } from '../models/rename-role';
import { UpdateRoleClaims } from '../models/update-role-claims';
import { ReplaceUserRoles } from '../models/replace-user-roles';
import { AddClaimsOverride } from '../models/add-claims-override';
import { RemoveClaimsOverride } from '../models/remove-claims-override';
import { CreateTenant } from '../models/create-tenant';
import { UpdateTenant } from '../models/update-tenant';
import { BaseApiService } from '../../rbk-utils/http/base-api.service';
import { GlobalInjector } from '../../../common/services/global-injector';


@Injectable({ providedIn: 'root' })
export class AuthorizationService extends BaseApiService {
  private endpoint = `${GlobalInjector.config.serverUrl}/api/authorization`;

  constructor(private http: HttpClient) {
    super();
  }

  public getAllClaims(): Observable<ClaimDetails[]> {
    return this.http.get<ClaimDetails[]>(`${this.endpoint}/claims`, this.generateDefaultHeaders({}));
  }
  public createClaim(data: CreateClaim): Observable<ClaimDetails> {
    return this.http.post<ClaimDetails>(`${this.endpoint}/claims`, data, this.generateDefaultHeaders({}));
  }
  public updateClaim(data: UpdateClaim): Observable<ClaimDetails> {
    return this.http.put<ClaimDetails>(`${this.endpoint}/claims`, data, this.generateDefaultHeaders({}));
  }
  public deleteClaim(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/claims/${id}`, this.generateDefaultHeaders({}));
  }
  public protectClaim(data: ProtectClaim): Observable<ClaimDetails> {
    return this.http.post<ClaimDetails>(`${this.endpoint}/claims/protect`, data, this.generateDefaultHeaders({}));
  }
  public unprotectClaim(data: UnprotectClaim): Observable<ClaimDetails> {
    return this.http.post<ClaimDetails>(`${this.endpoint}/claims/unprotect`, data, this.generateDefaultHeaders({}));
  }
  public getAllRoles(): Observable<RolesDetails[]> {
    return this.http.get<RolesDetails[]>(`${this.endpoint}/roles`, this.generateDefaultHeaders({}));
  }
  public createRole(data: CreateRole): Observable<RolesDetails> {
    return this.http.post<RolesDetails>(`${this.endpoint}/roles`, data, this.generateDefaultHeaders({}));
  }
  public updateRole(data: RenameRole): Observable<RolesDetails> {
    return this.http.put<RolesDetails>(`${this.endpoint}/roles`, data, this.generateDefaultHeaders({}));
  }
  public deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/roles/${id}`, this.generateDefaultHeaders({}));
  }
  public updateRoleClaims(data: UpdateRoleClaims): Observable<RolesDetails> {
    return this.http.post<RolesDetails>(`${this.endpoint}/roles/update-claims`, data, this.generateDefaultHeaders({}));
  }
  public getAllUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.endpoint}/users`, this.generateDefaultHeaders({}));
  }
  public updateUserRoles(data: ReplaceUserRoles): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.endpoint}/users/set-roles`, data, this.generateDefaultHeaders({}));
  }
  public addClaimsToUser(data: AddClaimsOverride): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.endpoint}/users/add-claims`, data, this.generateDefaultHeaders({}));
  }
  public removeClaimsFromUser(data: RemoveClaimsOverride): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.endpoint}/users/remove-claims`, data, this.generateDefaultHeaders({}));
  }
  public getAllTenants(): Observable<TenantDetails[]> {
    return this.http.get<TenantDetails[]>(`${this.endpoint}/tenants`, this.generateDefaultHeaders({}));
  }
  public createTenant(data: CreateTenant): Observable<TenantDetails> {
    return this.http.post<TenantDetails>(`${this.endpoint}/tenants`, data, this.generateDefaultHeaders({}));
  }
  public updateTenant(data: UpdateTenant): Observable<TenantDetails> {
    return this.http.put<TenantDetails>(`${this.endpoint}/tenants`, data, this.generateDefaultHeaders({}));
  }
  public deleteTenant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/tenants/${id}`, this.generateDefaultHeaders({}));
  }
}

