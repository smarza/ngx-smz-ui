import { Selector } from '@ngxs/store';
import cloneDeep from 'lodash-es/cloneDeep';
import { ProteusState, ProteusStateModel } from './proteus.state';
import { CADetails } from '../models/cadetails';

export class ProteusSelectors {

  @Selector([ProteusState])
  public static currentCAEmployee(state: ProteusStateModel): CADetails {
    return cloneDeep(state.employeeDetails);
  }

  @Selector([ProteusState])
  public static lastCARequestErrors(state: ProteusStateModel): string[] {
    return state.requestCAErrors;
  }

}