import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UsersDbActions } from './users.actions';
import { AuthorizationService } from '../../../modules/rbk-utils/services/authorization.service';
import { UserDetails } from '../../../modules/rbk-utils/models/user-details';

export const USERS_STATE_NAME = 'users';

export interface UsersDbStateModel {
  items: UserDetails[];
  lastUpdated?: Date;
}

export const getDbUsersInitialState = (): UsersDbStateModel => ({
  items: [],
  lastUpdated: null,
});

@State<UsersDbStateModel>({
  name: USERS_STATE_NAME,
  defaults: getDbUsersInitialState()
})

@Injectable()
export class UsersDbState {

  constructor(private apiService: AuthorizationService) { }

  @Action(UsersDbActions.LoadAll)
  public loadAll$(ctx: StateContext<UsersDbStateModel>): Observable<UserDetails[]> {
    return this.apiService.getAllUsers().pipe(
      tap((result: UserDetails[]) => {
        ctx.patchState({
          lastUpdated: new Date(),
          items: result,
        });
      })
    );
  }

}
