import { Selector } from '@ngxs/store';
import { ScenarioComparisonState, ScenarioComparisonStateModel } from './scenario-comparison.state';
import { ScenarioComparison } from '@models/scenario-comparison';

export class ScenarioComparisonSelectors {

  @Selector([ScenarioComparisonState])
  public static comparison(state: ScenarioComparisonStateModel): ScenarioComparison {
    return state.item;
  }

  @Selector([ScenarioComparisonState])
  public static loading(state: ScenarioComparisonStateModel): boolean {
    return state.loading;
  }

  @Selector([ScenarioComparisonState])
  public static error(state: ScenarioComparisonStateModel): string | null {
    return state.error;
  }
}
