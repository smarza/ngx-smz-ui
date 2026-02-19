import { createSelector, Selector } from '@ngxs/store';
import { PlantsState, PlantsStateModel } from './plants.state';
import { Plant } from '@models/plant';

export class PlantsSelectors {
  @Selector([PlantsState])
  public static all(state: PlantsStateModel): Plant[] {
    return state.items;
  }

  public static single(id: string): (state: PlantsStateModel) => Plant {
    return createSelector([PlantsState], (state: PlantsStateModel) => id == null ? null : state.items.find(x => x.id === id));
  }
}
