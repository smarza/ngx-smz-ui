import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RolesActions } from './roles.actions';
import { RolesService } from '../../services/roles.service';
import { RolesDetails } from '../../models/roles-details';
import { replaceItem } from '../../../../common/utils/utils';
import { ToastActions } from '../../../../../lib/state/global/application/application.actions.toast';

export const ROLES_STATE_NAME = 'roles';

export interface RolesStateModel {
  items: RolesDetails[];
  lastUpdated?: Date;
}

@State<RolesStateModel>({
  name: ROLES_STATE_NAME,
  defaults: {
    items: [],
    lastUpdated: null
  }
})

@Injectable()
export class RolesState {
  constructor(private apiService: RolesService) { }


  @Action(RolesActions.LoadAll)
  public loadAll$(ctx: StateContext<RolesStateModel>): Observable<RolesDetails[]> {
    return this.apiService.all().pipe(
      tap((result: RolesDetails[]) => {
        ctx.patchState({
          lastUpdated: new Date(),
          items: result,
        });
      })
    );
  }

  @Action(RolesActions.Create)
  public create$(ctx: StateContext<RolesStateModel>, action: RolesActions.Create): Observable<RolesDetails> {
    return this.apiService.create(action.data).pipe(
      tap((result: RolesDetails) => {
        ctx.patchState({
          items: [ result, ...ctx.getState().items ]
        });
        ctx.dispatch(new ToastActions.Success('Permissão criada com sucesso'));
      })
    );
  }

  @Action(RolesActions.Update)
  public update$(ctx: StateContext<RolesStateModel>, action: RolesActions.Update): Observable<RolesDetails> {
    return this.apiService.update(action.data).pipe(
      tap((result: RolesDetails) => {
        ctx.patchState({
          items: replaceItem(ctx.getState().items, result)
        });
        ctx.dispatch(new ToastActions.Success('Permissão atualizada com sucesso'));
      })
    );
  }

  @Action(RolesActions.Delete)
  public delete$(ctx: StateContext<RolesStateModel>, action: RolesActions.Delete): Observable<void> {
    return this.apiService.delete(action.id).pipe(
      tap(() => {
        ctx.patchState({
          items: [ ...ctx.getState().items.filter(x => x.id !== action.id) ]
        });
        ctx.dispatch(new ToastActions.Success('Permissão excluída com sucesso'));
      })
    );
  }

  @Action(RolesActions.UpdateClaims)
  public updateClaims$(ctx: StateContext<RolesStateModel>, action: RolesActions.UpdateClaims): Observable<RolesDetails> {
    return this.apiService.updateRoleClaims(action.data).pipe(
      tap((result: RolesDetails) => {
        ctx.patchState({
          items: replaceItem(ctx.getState().items, result)
        });
        ctx.dispatch(new ToastActions.Success('Acessos da Permissão atualizados com sucesso'));
      })
    );
  }

  @Action(RolesActions.Clear)
  public clear$(ctx: StateContext<RolesStateModel>): void {
    ctx.patchState({
      items: [],
      lastUpdated: null
    });
  }
}
