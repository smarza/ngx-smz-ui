import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '../../rbk-utils/http/base-api.service';
import { JwtResponse } from '../models/jwt-response';
import { RedefinePassword } from '../models/redefine-password';
import { RequestPasswordReset } from '../models/request-password-reset';
import { ResendEmailConfirmation } from '../models/resend-email-confirmation';
import { SwitchTenant } from '../models/switch-tenant';
import { CreateUser } from '../models/create-user';
import { UserDetails } from '../models/user-details';
import { ChangePassword } from '../models/change-password';
import { Register } from '../models/register';
import { DeleteUser } from '../models/delete-user';
import { DeativateUser } from '../models/deativate-user';
import { ActivateUser } from '../models/activate-user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/authentication`;

  constructor(private http: HttpClient) {
    super();
  }

  public login(): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.endpoint}/login`, null, this.generateDefaultHeaders({}));
  }

  public refreshToken(): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.endpoint}/refresh-token`, null, this.generateDefaultHeaders({}));
  }

  public sendResetPasswordEmail(data: RequestPasswordReset): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/reset-password`, data, this.generateDefaultHeaders({}));
  }

  public redefinePassword(data: RedefinePassword): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/redefine-password`, data, this.generateDefaultHeaders({}));
  }

  public resendEmailConfirmation(data: ResendEmailConfirmation): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/resend-confirmation`, data, this.generateDefaultHeaders({}));
  }

  public confirmEmail(): Observable<void> {
    return this.http.get<void>(`${this.endpoint}/confirm-email`, this.generateDefaultHeaders({}));
  }

  public switchTenant(data: SwitchTenant): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.endpoint}/switch-tenant`, data, this.generateDefaultHeaders({}));
  }

  // Todo
  public changePassword(data: ChangePassword): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/change-password`, data, this.generateDefaultHeaders({}));
  }

  // Todo
  public registerAnonymously(data: Register): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/user/register`, data, this.generateDefaultHeaders({}));
  }

  public createUser<TMetadata extends { [key: string]: string; }>(data: CreateUser<TMetadata>): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.endpoint}/user/create`, data, this.generateDefaultHeaders({}));
  }

  public deleteUser(data: DeleteUser): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/user/delete`, data, this.generateDefaultHeaders({}));
  }

  public deactivateUser(data: DeativateUser): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.endpoint}/user/deactivate`, data, this.generateDefaultHeaders({}));
  }

  public activateUser(data: ActivateUser): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.endpoint}/user/activate`, data, this.generateDefaultHeaders({}));
  }

}

