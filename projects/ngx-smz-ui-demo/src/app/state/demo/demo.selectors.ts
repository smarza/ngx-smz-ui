
import { Selector } from '@ngxs/store';
import { SimpleNamedEntity } from 'ngx-smz-dialogs';
import { DemoItem } from '../../models/demo';
import { DemoFeatureState, DemoFeatureStateModel } from './demo.state';

export class DemoFeatureSelectors {

  @Selector([DemoFeatureState])
  public static all(state: DemoFeatureStateModel): DemoItem[] {
    return state.items;
  }

}