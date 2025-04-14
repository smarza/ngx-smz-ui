import { createSelector, Selector } from '@ngxs/store';
import { RolesState, RolesStateModel } from './roles.state';
import { RolesDetails } from '../../models/roles-details';

export class RolesSelectors {
  @Selector([RolesState])
  public static all(state: RolesStateModel): RolesDetails[] {
    return state.items;
  }

  public static single(id: string): (state: RolesStateModel) => RolesDetails {
    return createSelector([RolesState], (state: RolesStateModel) => id == null ? null : state.items.find(x => x.id === id));
  }
}
