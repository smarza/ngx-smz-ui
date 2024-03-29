
import { Selector } from '@ngxs/store';
import { SimpleNamedEntity } from 'ngx-smz-ui';
import { CountriesDbState, CountriesDbStateModel } from './countries.state';

export class CountriesDbSelectors {

  @Selector([CountriesDbState])
  public static all(state: CountriesDbStateModel): SimpleNamedEntity[] {
    return state.items;
  }


}
