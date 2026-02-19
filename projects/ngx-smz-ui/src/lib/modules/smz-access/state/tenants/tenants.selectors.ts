import { createSelector, Selector } from '@ngxs/store';
import { TenantsState, TenantsStateModel } from './tenants.state';
import { TenantDetails } from '../../models/tenant-details';
import { AuthenticationState, AuthenticationStateModel } from '../../../../state/global/authentication/authentication.state';
import { BaseUserData } from '../../models/base-user-data';

export class TenantsSelectors {

  @Selector([TenantsState])
  public static all(state: TenantsStateModel): TenantDetails[] {
    return state.items;
  }

  public static single(id: string): (state: TenantsStateModel) => TenantDetails {
    return createSelector([TenantsState], (state: TenantsStateModel) => id == null ? null : state.items.find(x => x.alias?.toLowerCase() === id?.toLowerCase()));
  }

  @Selector([TenantsState, AuthenticationState])
  public static userAllowedTenants(state: TenantsStateModel, auth: AuthenticationStateModel<BaseUserData>): TenantDetails[] {
    const allowedTenants = auth.userdata?.allowedTenants;
    return state.items.filter(x => allowedTenants?.find(t => t?.toLowerCase() === x.alias?.toLowerCase()));
  }

  @Selector([TenantsState, AuthenticationState])
  public static currentTenant(state: TenantsStateModel, auth: AuthenticationStateModel<BaseUserData>): TenantDetails {
    const userTenant = auth.userdata?.tenant;
    return state.items.find(x => x.alias?.toLowerCase() === userTenant?.toLowerCase());
  }

}
