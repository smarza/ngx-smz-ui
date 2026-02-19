import { CADetails } from '@models/cadetails';
import { Selector } from '@ngxs/store';
import { ProteusState, ProteusStateModel } from './proteus.state';

export class ProteusSelectors {

  @Selector([ProteusState])
  public static currentCAEmployee(state: ProteusStateModel): CADetails {
    return state.employeeDetails;
  }

  @Selector([ProteusState])
  public static lastCARequestErrors(state: ProteusStateModel): string[] {
    return state.requestCAErrors;
  }

}