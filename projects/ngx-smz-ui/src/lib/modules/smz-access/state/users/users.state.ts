import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UsersActions } from './users.actions';
import { AuthorizationService } from '../../services/authorization.service';
import { UserDetails } from '../../models/user-details';
import { replaceItem } from '../../../../common/utils/utils';
import { ToastActions } from '../../../../state/global/application/application.actions.toast';
import { AuthenticationService } from '../../services/authentication.service';
import { CreateUser } from '../../models/create-user';

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

  constructor(private authorizationService: AuthorizationService, private authenticationService: AuthenticationService) { }

  @Action(UsersActions.LoadAll)
  public loadAll$(ctx: StateContext<UsersStateModel>): Observable<UserDetails[]> {
    return this.authorizationService.getAllUsers().pipe(
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
    return this.authorizationService.updateUserRoles(action.data).pipe(
      tap((result: UserDetails) => {
        ctx.patchState({items: replaceItem(ctx.getState().items, result) });
        ctx.dispatch(new ToastActions.Success('Regras de acesso do usuário atualizadas com sucesso.'));
      })
    );
  }

  @Action(UsersActions.AddClaimsOverride)
  public onAddClaimsOverride$(ctx: StateContext<UsersStateModel>, action: UsersActions.AddClaimsOverride): Observable<UserDetails> {
    return this.authorizationService.addClaimsToUser(action.data).pipe(
      tap((result: UserDetails) => {
        ctx.patchState({items: replaceItem(ctx.getState().items, result) });
        ctx.dispatch(new ToastActions.Success('Permissões do usuário atualizadas com sucesso.'));
      })
    );
  }

  @Action(UsersActions.RemoveClaimsOverride)
  public onRemoveClaimsOverride$(ctx: StateContext<UsersStateModel>, action: UsersActions.RemoveClaimsOverride): Observable<UserDetails> {
    return this.authorizationService.removeClaimsFromUser(action.data).pipe(
      tap((result: UserDetails) => {
        ctx.patchState({items: replaceItem(ctx.getState().items, result) });
        ctx.dispatch(new ToastActions.Success('Permissões do usuário atualizadas com sucesso.'));
      })
    );
  }

  @Action(UsersActions.RedefinePassword)
  public onRedefinePassword$(ctx: StateContext<UsersStateModel>, action: UsersActions.RedefinePassword): Observable<void> {
    return this.authenticationService.redefinePassword(action.data).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Senha atualizada com sucesso.'));
      })
    );
  }

  @Action(UsersActions.ResetPassword)
  public onResetPassword$(ctx: StateContext<UsersStateModel>, action: UsersActions.ResetPassword): Observable<void> {
    return this.authenticationService.resendEmailConfirmation(action.data).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Email de confirmação enviado com sucesso.'));
      })
    );
  }

  @Action(UsersActions.Create)
  public onCreate$(ctx: StateContext<UsersStateModel>, action: UsersActions.Create<CreateUser>): Observable<UserDetails> {
    return this.authenticationService.createUser(action.data).pipe(
      tap((result: UserDetails) => {
        ctx.patchState({ items: [result, ...ctx.getState().items] });
        ctx.dispatch(new ToastActions.Success('Usuário criado com sucesso.'));
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

  @Action(UsersActions.Clear)
  public clear$(ctx: StateContext<UsersStateModel>): void {
    ctx.patchState({
      items: [],
      lastUpdated: null
    });
  }

}
