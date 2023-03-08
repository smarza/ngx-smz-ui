import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UsersActions } from './users.actions';
import { AuthorizationService } from '../../services/authorization.service';
import { UserDetails } from '../../models/user-details';
import { replaceItem } from '../../../../common/utils/utils';
import { ToastActions } from '../../../../state/global/application/application.actions.toast';

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

  @Action(UsersActions.ReplaceUserRoles)
  public onReplaceUserRoles$(ctx: StateContext<UsersStateModel>, action: UsersActions.ReplaceUserRoles): Observable<UserDetails> {
    return this.apiService.updateUserRoles(action.data).pipe(
      tap((result: UserDetails) => {
        ctx.patchState({items: replaceItem(ctx.getState().items, result) });
        ctx.dispatch(new ToastActions.Success('Regras de acesso do usuário atualizadas com sucesso.'));
      })
    );
  }

  @Action(UsersActions.AddClaimsOverride)
  public onAddClaimsOverride$(ctx: StateContext<UsersStateModel>, action: UsersActions.AddClaimsOverride): Observable<UserDetails> {
    return this.apiService.addClaimsToUser(action.data).pipe(
      tap((result: UserDetails) => {
        ctx.patchState({items: replaceItem(ctx.getState().items, result) });
        ctx.dispatch(new ToastActions.Success('Permissões do usuário atualizadas com sucesso.'));
      })
    );
  }

  @Action(UsersActions.RemoveClaimsOverride)
  public onRemoveClaimsOverride$(ctx: StateContext<UsersStateModel>, action: UsersActions.RemoveClaimsOverride): Observable<UserDetails> {
    return this.apiService.removeClaimsFromUser(action.data).pipe(
      tap((result: UserDetails) => {
        ctx.patchState({items: replaceItem(ctx.getState().items, result) });
        ctx.dispatch(new ToastActions.Success('Permissões do usuário atualizadas com sucesso.'));
      })
    );
  }

  @Action(UsersActions.LocalCreate)
  public onLocalCreate$(ctx: StateContext<UsersStateModel>, action: UsersActions.LocalCreate<UserDetails>): void {
    ctx.patchState({ items: [action.data, ...ctx.getState().items] });
  }

  @Action(UsersActions.LocalUpdate)
  public onLocalUpdate$(ctx: StateContext<UsersStateModel>, action: UsersActions.LocalUpdate<UserDetails>): void {
    ctx.patchState({ items: replaceItem(ctx.getState().items, action.data) });
  }

  @Action(UsersActions.LocalDelete)
  public LocalDelete$(ctx: StateContext<UsersStateModel>, action: UsersActions.LocalDelete): void {
    ctx.patchState({ items: [...ctx.getState().items.filter(x => x.id !== action.id)] });
  }

}
