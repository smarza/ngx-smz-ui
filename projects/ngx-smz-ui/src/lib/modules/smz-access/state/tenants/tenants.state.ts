import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TenantsActions } from './tenants.actions';
import { TenantDetails } from '../../models/tenant-details';
import { replaceItem } from '../../../../common/utils/utils';
import { ToastActions } from '../../../../../lib/state/global/application/application.actions.toast';
import { AuthorizationService } from '../../services/authorization.service';
import { GlobalInjector } from '../../../../common/services/global-injector';

export const TENANTS_STATE_NAME = 'tenants';

export interface TenantsStateModel {
  items: TenantDetails[];
  lastUpdated?: Date;
}

@State<TenantsStateModel>({
  name: TENANTS_STATE_NAME,
  defaults: {
    items: [],
    lastUpdated: null
  }
})

@Injectable()
export class TenantsState {
  constructor(private apiService: AuthorizationService) { }


  @Action(TenantsActions.LoadAll)
  public loadAll$(ctx: StateContext<TenantsStateModel>): Observable<TenantDetails[]> {
    return this.apiService
      .withParameters<AuthorizationService>({ authentication: false, needToRefreshToken: false })
      .getAllTenants()
      .pipe(
        tap((result: TenantDetails[]) => {
          ctx.patchState({
            lastUpdated: new Date(),
            items: result,
          });
        })
    );
  }

  @Action(TenantsActions.Create)
  public create$(ctx: StateContext<TenantsStateModel>, action: TenantsActions.Create): Observable<TenantDetails> {
    return this.apiService.createTenant(action.data).pipe(
      tap((result: TenantDetails) => {
        ctx.patchState({
          items: [ result, ...ctx.getState().items ]
        });
        const displayName = GlobalInjector.config.locale.authorization.tenant.displayName;
        ctx.dispatch(new ToastActions.Success(`${displayName} criada com sucesso`))
      })
    );
  }

  @Action(TenantsActions.Update)
  public update$(ctx: StateContext<TenantsStateModel>, action: TenantsActions.Update): Observable<TenantDetails> {
    return this.apiService.updateTenant(action.data).pipe(
      tap((result: TenantDetails) => {
        ctx.patchState({
          items: replaceItem(ctx.getState().items, result)
        });
        const displayName = GlobalInjector.config.locale.authorization.tenant.displayName;
        ctx.dispatch(new ToastActions.Success(`${displayName} atualizado com sucesso`))
      })
    );
  }

  @Action(TenantsActions.Delete)
  public delete$(ctx: StateContext<TenantsStateModel>, action: TenantsActions.Delete): Observable<void> {
    return this.apiService.deleteTenant(action.alias).pipe(
      tap(() => {
        ctx.patchState({
          items: [ ...ctx.getState().items.filter(x => x.alias !== action.alias) ]
        });
        const displayName = GlobalInjector.config.locale.authorization.tenant.displayName;
        ctx.dispatch(new ToastActions.Success(`${displayName} excluído com sucesso`))
      })
    );
  }

  @Action(TenantsActions.Clear)
  public clear$(ctx: StateContext<TenantsStateModel>): void {
    ctx.patchState({
      items: [],
      lastUpdated: null
    });
  }
}
