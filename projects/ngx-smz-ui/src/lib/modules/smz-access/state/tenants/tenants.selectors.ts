import { createSelector, Selector } from '@ngxs/store';
import { TenantsState, TenantsStateModel } from './tenants.state';
import { TenantDetails } from '../../models/tenant-details';
import { AuthenticationState } from '../../../../state/global/authentication/authentication.state';

export class TenantsSelectors {
  @Selector([TenantsState, AuthenticationState])
  public static all(state: TenantsStateModel): TenantDetails[] {
    return state.items;
  }

  public static single(id: string): (state: TenantsStateModel) => TenantDetails {
    return createSelector([TenantsState], (state: TenantsStateModel) => id == null ? null : state.items.find(x => x.alias === id));
  }
}
