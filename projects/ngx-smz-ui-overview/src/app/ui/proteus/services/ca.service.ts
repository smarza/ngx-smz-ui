import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from 'ngx-smz-ui';
import { Login } from '../models/login';
import { JwtResponse } from '../models/jwt-response';
import { GetEmployeeDetails } from '../models/get-employee-details';
import { CADetails } from '../models/cadetails';
import { UpdateEmployee } from '../models/update-employee';
import { UserDetails } from '../models/user-details';


@Injectable({ providedIn: 'root' })
export class CaService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/ca`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  public login(data: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.endpoint}/login`, data, this.generateDefaultHeaders({}));
  }
  public getEmployeeDetails(data: GetEmployeeDetails): Observable<CADetails> {
    return this.http.post<CADetails>(`${this.endpoint}/employee/details`, data, this.generateDefaultHeaders({ errorHandlingType: 'toast' }));
  }
  public updateEmployee(data: UpdateEmployee): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.endpoint}/employee/update`, data, this.generateDefaultHeaders({}));
  }
}

