import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ClaimsActions } from './claims.actions';
import { ClaimDetails } from '../../models/claim-details';
import { replaceItem } from '../../../../common/utils/utils';
import { ToastActions } from '../../../../../lib/state/global/application/application.actions.toast';
import { AuthorizationService } from '../../services/authorization.service';

export const CLAIMS_STATE_NAME = 'claims';

export interface ClaimsStateModel {
  items: ClaimDetails[];
  lastUpdated?: Date;
}

@State<ClaimsStateModel>({
  name: CLAIMS_STATE_NAME,
  defaults: {
    items: [],
    lastUpdated: null
  }
})

@Injectable()
export class ClaimsState {
  constructor(private apiService: AuthorizationService) { }


  @Action(ClaimsActions.LoadAll)
  public loadAll$(ctx: StateContext<ClaimsStateModel>): Observable<ClaimDetails[]> {
    return this.apiService.getAllClaims().pipe(
      tap((result: ClaimDetails[]) => {
        ctx.patchState({
          lastUpdated: new Date(),
          items: result,
        });
      })
    );
  }

  @Action(ClaimsActions.Create)
  public create$(ctx: StateContext<ClaimsStateModel>, action: ClaimsActions.Create): Observable<ClaimDetails> {
    return this.apiService.createClaim(action.data).pipe(
      tap((result: ClaimDetails) => {
        ctx.patchState({
          items: [ result, ...ctx.getState().items ]
        });
        ctx.dispatch(new ToastActions.Success('Permissão de acesso criada com sucesso'))
      })
    );
  }

  @Action(ClaimsActions.Update)
  public update$(ctx: StateContext<ClaimsStateModel>, action: ClaimsActions.Update): Observable<ClaimDetails> {
    return this.apiService.updateClaim(action.data).pipe(
      tap((result: ClaimDetails) => {
        ctx.patchState({
          items: replaceItem(ctx.getState().items, result)
        });
        ctx.dispatch(new ToastActions.Success('Permissão de acesso atualizada com sucesso'))
      })
    );
  }

  @Action(ClaimsActions.Protect)
  public protect$(ctx: StateContext<ClaimsStateModel>, action: ClaimsActions.Protect): Observable<ClaimDetails> {
    return this.apiService.protectClaim(action.data).pipe(
      tap((result: ClaimDetails) => {
        ctx.patchState({
          items: replaceItem(ctx.getState().items, result)
        });
        ctx.dispatch(new ToastActions.Success('Permissão de acesso protegida com sucesso'))
      })
    );
  }

  @Action(ClaimsActions.Unprotect)
  public unprotect$(ctx: StateContext<ClaimsStateModel>, action: ClaimsActions.Unprotect): Observable<ClaimDetails> {
    return this.apiService.unprotectClaim(action.data).pipe(
      tap((result: ClaimDetails) => {
        ctx.patchState({
          items: replaceItem(ctx.getState().items, result)
        });
        ctx.dispatch(new ToastActions.Success('Permissão de acesso desprotegida com sucesso'))
      })
    );
  }

  @Action(ClaimsActions.Delete)
  public delete$(ctx: StateContext<ClaimsStateModel>, action: ClaimsActions.Delete): Observable<void> {
    return this.apiService.deleteClaim(action.id).pipe(
      tap(() => {
        ctx.patchState({
          items: [ ...ctx.getState().items.filter(x => x.id !== action.id) ]
        });
        ctx.dispatch(new ToastActions.Success('Permissão de acesso excluída com sucesso'))
      })
    );
  }

  @Action(ClaimsActions.Clear)
  public clear$(ctx: StateContext<ClaimsStateModel>): void {
    ctx.patchState({
      items: [],
      lastUpdated: null
    });
  }
}
