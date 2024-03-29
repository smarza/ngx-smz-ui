import { createSelector, Selector } from '@ngxs/store';
import { ClaimsState, ClaimsStateModel } from './claims.state';
import { ClaimDetails } from '../../models/claim-details';
import { AuthenticationState, AuthenticationStateModel } from '../../../../state/global/authentication/authentication.state';

export class ClaimsSelectors {
  @Selector([ClaimsState, AuthenticationState])
  public static all(state: ClaimsStateModel): ClaimDetails[] {
    return state.items;
  }

  @Selector([ClaimsState])
  public static allUnprotected(state: ClaimsStateModel): ClaimDetails[] {
    return state.items?.filter(x => !x.isProtected);
  }

  public static single(id: string): (state: ClaimsStateModel) => ClaimDetails {
    return createSelector([ClaimsState], (state: ClaimsStateModel) => id == null ? null : state.items.find(x => x.id === id));
  }
}
