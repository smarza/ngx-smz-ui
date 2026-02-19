import { Selector } from '@ngxs/store';
import { ScenariosFtState, ScenariosFtStateModel } from './scenarios.state';
import { ScenarioDetails } from '@models/scenario-details';

export class ScenariosFtSelectors {

  @Selector([ScenariosFtState])
  public static getDetails(state: ScenariosFtStateModel): ScenarioDetails {
    return state.item;
  }
}
