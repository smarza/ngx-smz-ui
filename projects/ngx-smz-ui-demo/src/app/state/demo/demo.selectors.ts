
import { Selector } from '@ngxs/store';
import { xor } from 'lodash';
import { DemoItem } from '../../models/demo';
import { DemoFeatureState, DemoFeatureStateModel } from './demo.state';

export class DemoFeatureSelectors {

  @Selector([DemoFeatureState])
  public static all(state: DemoFeatureStateModel): any[] {
    return state.items.map((x, index) => ({ ...x, roles: [
      { id: '1', name: 'teste 1'},
      { id: '2', name: 'teste 2'},
      { id: '3', name: 'teste 3'},
      { id: '4', name: 'teste 4'},
      { id: index, name: `index ${index}`}
    ]}));
  }

}