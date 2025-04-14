import { Selector, createSelector } from '@ngxs/store';
import { UsersStateModel, UsersState } from './users.state';
import { UserDetails } from '../../models/user-details';

export class UsersSelectors {

  @Selector([UsersState])
  public static all(state: UsersStateModel): UserDetails[] {
    return state.items;
  }

  @Selector([UsersState])
  public static activated(state: UsersStateModel): UserDetails[] {
    return state.items.filter(x => x.isActive);
  }

  @Selector([UsersState])
  public static deactivated(state: UsersStateModel): UserDetails[] {
    return state.items.filter(x => !x.isActive);
  }

  public static single(username: string) {
    return createSelector([UsersState], (state: UsersStateModel) => {
      return state.items.find(x => x.username === username);
    });
  }

}
