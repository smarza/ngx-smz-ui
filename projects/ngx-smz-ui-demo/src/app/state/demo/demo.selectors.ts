
import { Selector } from '@ngxs/store';
import { SimpleNamedEntity } from 'ngx-smz-dialogs';
import { DemoItem } from '../../models/demo';
import { DemoFeatureState, DemoFeatureStateModel } from './demo.state';

export class DemoFeatureSelectors {

  @Selector([DemoFeatureState])
  public static all(state: DemoFeatureStateModel): DemoItem[] {
    return state.items;
  }

  @Selector([DemoFeatureState])
  public static countries(): SimpleNamedEntity[] {
    return countries;
  }

}

export const countries: SimpleNamedEntity[] = [
  { id: 'Brasil', name: 'Brasil' },
  { id: 'EUA', name: 'EUA' },
  { id: 'Japão', name: 'Japão' },
  { id: 'Gothan City', name: 'Gothan City' },
  { id: 'New Yourk', name: 'New Yourk' },
  { id: 'Colorado', name: 'Colorado' }
];