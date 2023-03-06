import { Selector, createSelector } from '@ngxs/store';
import { UsersFtStateModel, UsersFtState } from './users.state';
import cloneDeep from 'lodash-es/cloneDeep';
import { PetrobrasUserCaDetails } from '@models/petrobras-ca-user-details';

export class UsersFtSelectors {

  @Selector([UsersFtState])
  public static currentCAUser(state: UsersFtStateModel): PetrobrasUserCaDetails {
    return cloneDeep(state.itemCA);
  }

  @Selector([UsersFtState])
  public static lastCARequestErrors(state: UsersFtStateModel): string[] {
    return state.requestCAErrors;
  }


}
