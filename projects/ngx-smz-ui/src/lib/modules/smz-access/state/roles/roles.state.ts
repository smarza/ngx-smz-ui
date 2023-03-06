import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RolesActions } from './roles.actions';
import { replaceItem } from '../../../../common/utils/utils';
import { ToastActions } from '../../../../../lib/state/global/application/application.actions.toast';
import { AuthorizationService } from '../../services/authorization.service';
import { RolesDetails } from '../../models/roles-details';

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
  constructor(private apiService: AuthorizationService) { }


  @Action(RolesActions.LoadAll)
  public loadAll$(ctx: StateContext<RolesStateModel>): Observable<RolesDetails[]> {
    return this.apiService.getAllRoles().pipe(
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
    return this.apiService.createRole(action.data).pipe(
      tap((result: RolesDetails) => {
        ctx.dispatch(new RolesActions.Clear());
        ctx.dispatch(new RolesActions.LoadAll());
        ctx.dispatch(new ToastActions.Success('Regra de acesso criada com sucesso'));
      })
    );
  }

  @Action(RolesActions.Update)
  public update$(ctx: StateContext<RolesStateModel>, action: RolesActions.Update): Observable<RolesDetails> {
    return this.apiService.updateRole(action.data).pipe(
      tap((result: RolesDetails) => {
        ctx.dispatch(new RolesActions.Clear());
        ctx.dispatch(new RolesActions.LoadAll());
        ctx.dispatch(new ToastActions.Success('Regra de acesso atualizada com sucesso'));
      })
    );
  }

  @Action(RolesActions.Delete)
  public delete$(ctx: StateContext<RolesStateModel>, action: RolesActions.Delete): Observable<void> {
    return this.apiService.deleteRole(action.id).pipe(
      tap(() => {
        ctx.dispatch(new RolesActions.Clear());
        ctx.dispatch(new RolesActions.LoadAll());
        ctx.dispatch(new ToastActions.Success('Regra de acesso excluída com sucesso'));
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
        ctx.dispatch(new ToastActions.Success('Regras de acesso atualizadas com sucesso'));
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
