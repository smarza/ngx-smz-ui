import { Selector, createSelector } from '@ngxs/store';
import { UsersStateModel, UsersState } from './users.state';
import cloneDeep from 'lodash-es/cloneDeep';
import { UserDetails } from '../../models/user-details';

export class UsersSelectors {

  @Selector([UsersState])
  public static users(state: UsersStateModel): UserDetails[] {
    return cloneDeep(state.items);
  }

  public static single(username: string) {
    return createSelector([UsersState], (state: UsersStateModel) => {
      const user = cloneDeep(state.items.find(x => x.username === username));
      return user;
    });
  }

}
