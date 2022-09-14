import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AccessActions } from './access.actions';
import { AccessService } from '../../services/access.service';
import { SimpleNamedEntity } from '../../../../common/models/simple-named-entity';
import { ClaimOverride } from '../../models/claim-override';

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

  constructor(private apiService: AccessService) { }

  @Action(AccessActions.UpdateUserRoles)
  public onUpdateUserRoles$(ctx: StateContext<AccessStateModel>, action: AccessActions.UpdateUserRoles): Observable<SimpleNamedEntity[]> {
    return this.apiService.updateUserRoles(action.data).pipe(
      tap((results: SimpleNamedEntity[]) => {
        ctx.dispatch(new AccessActions.UpdateUserRolesSuccess(action.data.username, results));
      })
    );
  }

  @Action(AccessActions.AddClaimToUser)
  public onAddClaimToUser$(ctx: StateContext<AccessStateModel>, action: AccessActions.AddClaimToUser): Observable<ClaimOverride[]> {
    return this.apiService.addClaimToUser(action.data).pipe(
      tap((results: ClaimOverride[]) => {
        ctx.dispatch(new AccessActions.UpdateUserClaimsSuccess(action.data.username, results));
      })
    );
  }

  @Action(AccessActions.RemoveClaimFromUser)
  public onRemoveClaimFromUser$(ctx: StateContext<AccessStateModel>, action: AccessActions.RemoveClaimFromUser): Observable<ClaimOverride[]> {
    return this.apiService.removeClaimFromUser(action.data).pipe(
      tap((results: ClaimOverride[]) => {
        ctx.dispatch(new AccessActions.UpdateUserClaimsSuccess(action.data.username, results));
      })
    );
  }
}
