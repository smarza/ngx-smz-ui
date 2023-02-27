import { Selector, createSelector } from '@ngxs/store';
import { UsersDbStateModel, UsersDbState } from './users.state';
import cloneDeep from 'lodash-es/cloneDeep';
import { UserDetails } from '../../../modules/rbk-utils/models/user-details';

export class UsersDbSelectors {

  @Selector([UsersDbState])
  public static users(state: UsersDbStateModel): UserDetails[] {
    return cloneDeep(state.items);
  }

  public static single(id: string) {
    return createSelector([UsersDbState], (state: UsersDbStateModel) => {
      const user = cloneDeep(state.items.find(x => x.id === id));
      return user;
    });
  }

}
