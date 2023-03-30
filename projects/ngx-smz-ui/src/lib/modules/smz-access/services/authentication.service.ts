import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '../../rbk-utils/http/base-api.service';
import { JwtResponse } from '../models/jwt-response';
import { RedefinePassword } from '../models/redefine-password';
import { ResetPassword } from '../models/reset-password';
import { ResendConfirmation } from '../models/resend-confirmation';
import { SwitchTenant } from '../models/switch-tenant';
import { CreateUser } from '../models/create-user';
import { UserDetails } from '../models/user-details';


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

  public sendResetPasswordEmail(data: ResetPassword): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/reset-password`, data, this.generateDefaultHeaders({}));
  }

  public redefinePassword(data: RedefinePassword): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/redefine-password`, data, this.generateDefaultHeaders({}));
  }

  public resendEmailConfirmation(data: ResendConfirmation): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/resend-confirmation`, data, this.generateDefaultHeaders({}));
  }

  public confirmEmail(): Observable<void> {
    return this.http.get<void>(`${this.endpoint}/confirm-email`, this.generateDefaultHeaders({}));
  }

  public switchTenant(data: SwitchTenant): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.endpoint}/switch-tenant`, data, this.generateDefaultHeaders({}));
  }

  public createUser(data: CreateUser): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.endpoint}/create-user`, data, this.generateDefaultHeaders({}));
  }
}

