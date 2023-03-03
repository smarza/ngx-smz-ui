import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AccessActions } from './access.actions';
import { ClaimOverride } from '../../models/claim-override';
import { ToastActions } from '../../../../../lib/state/global/application/application.actions.toast';
import { AuthorizationService } from '../../services/authorization.service';
import { UserDetails } from '../../models/user-details';

export const ACCESS_STATE_NAME = 'access';

export interface AccessStateModel {
}

export const getAccessInitialState = (): AccessStateModel => ({
});

@State<AccessStateModel>({
  name: ACCESS_STATE_NAME,
  defaults: getAccessInitialState()
})

@Injectable()
export class AccessState {

  constructor(private apiService: AuthorizationService) { }

  @Action(AccessActions.AddClaimOverride)
  public onAddClaimOverride$(ctx: StateContext<AccessStateModel>, action: AccessActions.AddClaimOverride): Observable<ClaimOverride[]> {
    return this.apiService.addClaimToUser(action.data).pipe(
      tap((results: ClaimOverride[]) => {
        ctx.dispatch(new AccessActions.UpdateUserClaimsSuccess(action.data.username, results));
        ctx.dispatch(new ToastActions.Success('Permissões de acesso do usuário criada com sucesso'));
      })
    );
  }

  @Action(AccessActions.RemoveClaimOverride)
  public onRemoveClaimOverride$(ctx: StateContext<AccessStateModel>, action: AccessActions.RemoveClaimOverride): Observable<ClaimOverride[]> {
    return this.apiService.removeClaimFromUser(action.data).pipe(
      tap((results: ClaimOverride[]) => {
        ctx.dispatch(new AccessActions.UpdateUserClaimsSuccess(action.data.username, results));
        ctx.dispatch(new ToastActions.Success('Permissões de acesso do usuário excluída com sucesso'));
      })
    );
  }
}
