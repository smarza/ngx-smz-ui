import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UsersActions } from './users.actions';
import { AuthorizationService } from '../../services/authorization.service';
import { UserDetails } from '../../models/user-details';

export const USERS_STATE_NAME = 'users';

export interface UsersStateModel {
  items: UserDetails[];
  lastUpdated?: Date;
}

export const getUsersInitialState = (): UsersStateModel => ({
  items: [],
  lastUpdated: null,
});

@State<UsersStateModel>({
  name: USERS_STATE_NAME,
  defaults: getUsersInitialState()
})

@Injectable()
export class UsersState {

  constructor(private apiService: AuthorizationService) { }

  @Action(UsersActions.LoadAll)
  public loadAll$(ctx: StateContext<UsersStateModel>): Observable<UserDetails[]> {
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
