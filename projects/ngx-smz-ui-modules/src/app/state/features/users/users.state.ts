import { State, Action, StateContext } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UsersFtActions } from './users.actions';
import { ToastActions, UsersActions } from 'ngx-smz-ui';
import { PetrobrasUserCaDetails } from '@models/petrobras-ca-user-details';
import { PetrobrasUsersService } from '@services/petrobras-users.service';
import { PetrobrasUserDetails } from '@models/petrobras-user-details';

export const USERS_FT_STATE_NAME = 'usersFt';

export interface UsersFtStateModel {
  itemCA: PetrobrasUserCaDetails;
  requestCAErrors: string[];
}

export const getFtUsersInitialState = (): UsersFtStateModel => ({
  itemCA: null,
  requestCAErrors: null
});

@State<UsersFtStateModel>({
  name: USERS_FT_STATE_NAME,
  defaults: getFtUsersInitialState()
})

@Injectable()
export class UsersFtState {

  constructor(private usersService: PetrobrasUsersService) { }

  @Action(UsersFtActions.LoadCASingle)
  public loadCASingle$(ctx: StateContext<UsersFtStateModel>, action: UsersFtActions.LoadCASingle): Observable<PetrobrasUserCaDetails> {
    return this.usersService.caDetails(action.username).pipe(
      catchError(event => {
        ctx.patchState({ itemCA: null, requestCAErrors: event.error });
        return of();
      }),
      tap((result: PetrobrasUserCaDetails) => {
        ctx.patchState({ itemCA: result, requestCAErrors: null });
      })
    );
  }

  @Action(UsersFtActions.Remove)
  public onRemove$(ctx: StateContext<UsersFtStateModel>, action: UsersFtActions.Remove): Observable<void> {
    return this.usersService.remove(action.data).pipe(
      tap(() => {
        ctx.dispatch(new UsersActions.LocalDelete(action.data.id))
        ctx.dispatch(new ToastActions.Success('Usuário removido com sucesso'));
      }),
    );
  }

  @Action(UsersFtActions.CreateUserWithSingleRole)
  public onCreateUserWithSingleRole$(ctx: StateContext<UsersFtStateModel>, action: UsersFtActions.CreateUserWithSingleRole): Observable<PetrobrasUserDetails> {
    return this.usersService.createWithSingleRole(action.data).pipe(
      tap((result: PetrobrasUserDetails) => {
        ctx.dispatch(new UsersActions.LocalCreate(result))
        ctx.dispatch(new ToastActions.Success('Usuário criado com sucesso'));
      })
    );
  }

  @Action(UsersFtActions.UpdateUserWithSingleRole)
  public onUpdateUserWithSingleRole$(ctx: StateContext<UsersFtStateModel>, action: UsersFtActions.UpdateUserWithSingleRole): Observable<PetrobrasUserDetails> {
    return this.usersService.updateWithSingleRole(action.data).pipe(
      tap((result: PetrobrasUserDetails) => {
        ctx.dispatch(new UsersActions.LocalUpdate(result))
        ctx.dispatch(new ToastActions.Success('Usuário atualizado com sucesso'));
      })
    );
  }

  @Action(UsersFtActions.CreateWithMultipleRoles)
  public onCreateWithMultipleRoles$(ctx: StateContext<UsersFtStateModel>, action: UsersFtActions.CreateWithMultipleRoles): Observable<PetrobrasUserDetails> {
    return this.usersService.createWithMultipleRoles(action.data).pipe(
      tap((result: PetrobrasUserDetails) => {
        ctx.dispatch(new UsersActions.LocalCreate(result))
        ctx.dispatch(new ToastActions.Success('Usuário criado com sucesso'));
      })
    );
  }

  @Action(UsersFtActions.UpdateWithMultipleRoles)
  public onUpdateWithMultipleRoles$(ctx: StateContext<UsersFtStateModel>, action: UsersFtActions.UpdateWithMultipleRoles): Observable<PetrobrasUserDetails> {
    return this.usersService.updateWithMultipleRoles(action.data).pipe(
      tap((result: PetrobrasUserDetails) => {
        ctx.dispatch(new UsersActions.LocalUpdate(result))
        ctx.dispatch(new ToastActions.Success('Usuário atualizado com sucesso'));
      })
    );
  }
}
