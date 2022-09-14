import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ClaimsActions } from './claims.actions';
import { ClaimsService } from '../../services/claims.service';
import { ClaimDetails } from '../../models/claim-details';
import { replaceItem } from '../../../../common/utils/utils';

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
  constructor(private apiService: ClaimsService) { }


  @Action(ClaimsActions.LoadAll)
  public loadAll$(ctx: StateContext<ClaimsStateModel>): Observable<ClaimDetails[]> {
    return this.apiService.all().pipe(
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
    return this.apiService.create(action.data).pipe(
      tap((result: ClaimDetails) => {
        ctx.patchState({
          items: [ result, ...ctx.getState().items ]
        });
      })
    );
  }

  @Action(ClaimsActions.Update)
  public update$(ctx: StateContext<ClaimsStateModel>, action: ClaimsActions.Update): Observable<ClaimDetails> {
    return this.apiService.update(action.data).pipe(
      tap((result: ClaimDetails) => {
        ctx.patchState({
          items: replaceItem(ctx.getState().items, result)
        });
      })
    );
  }

  @Action(ClaimsActions.Delete)
  public delete$(ctx: StateContext<ClaimsStateModel>, action: ClaimsActions.Delete): Observable<void> {
    return this.apiService.delete(action.id).pipe(
      tap(() => {
        ctx.patchState({
          items: [ ...ctx.getState().items.filter(x => x.id !== action.id) ]
        });
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
