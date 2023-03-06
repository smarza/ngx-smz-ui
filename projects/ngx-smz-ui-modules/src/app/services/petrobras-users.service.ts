import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from 'ngx-smz-ui';
import { PetrobrasUserDetails } from '../models/petrobras-user-details';
import { PetrobrasUserCaDetails } from '../models/petrobras-ca-user-details';
import { UpdateUserWithSingleRole } from '@models/update-user-with-single-role';
import { CreateUserWithSingleRole } from '@models/create-user-with-single-role';
import { UpdateUserWithMultipleRoles } from '@models/update-user-with-multiple-roles';
import { CreateUserWithMultipleRoles } from '@models/create-user-with-multiple-roles';
import { DeleteUser } from '@models/delete-user';


@Injectable({ providedIn: 'root' })
export class PetrobrasUsersService extends BaseApiService {
  private endpoint = `${environment.authenticationApi}/api/users`;

  constructor(private http: HttpClient) {
    super();
  }

  public caDetails(username: string): Observable<PetrobrasUserCaDetails> {
    return this.http.get<PetrobrasUserCaDetails>(`${this.endpoint}/user-info/${username}`, this.generateDefaultHeaders({}));
  }
  public remove(data: DeleteUser): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/remove`, data, this.generateDefaultHeaders({}));
  }
  public updateWithSingleRole(data: UpdateUserWithSingleRole): Observable<PetrobrasUserDetails> {
    return this.http.put<PetrobrasUserDetails>(`${this.endpoint}/update-single-role`, data, this.generateDefaultHeaders({}));
  }
  public createWithSingleRole(data: CreateUserWithSingleRole): Observable<PetrobrasUserDetails> {
    return this.http.post<PetrobrasUserDetails>(`${this.endpoint}/create-with-single-role`, data, this.generateDefaultHeaders({}));
  }
  public updateWithMultipleRoles(data: UpdateUserWithMultipleRoles): Observable<PetrobrasUserDetails> {
    return this.http.put<PetrobrasUserDetails>(`${this.endpoint}/update-multiple-roles`, data, this.generateDefaultHeaders({}));
  }
  public createWithMultipleRoles(data: CreateUserWithMultipleRoles): Observable<PetrobrasUserDetails> {
    return this.http.post<PetrobrasUserDetails>(`${this.endpoint}/create-with-multiple-roles`, data, this.generateDefaultHeaders({}));
  }
}

