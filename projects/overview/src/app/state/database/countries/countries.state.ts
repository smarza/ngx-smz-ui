import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SimpleNamedEntity } from '@ngx-smz/core';
import { DemoDataService } from '../../demo/demo-data.service';
import { CountriesDbActions } from './countries.actions';

export const CountriesDbName = 'countries';

export interface CountriesDbStateModel {
  lastUpdated: Date | null;
  items: SimpleNamedEntity[];
}

export const getDbCountriesInitialState = (): CountriesDbStateModel => ({
  lastUpdated: null,
  items: null
});

@State<CountriesDbStateModel>({
  name: CountriesDbName,
  defaults: getDbCountriesInitialState()
})

@Injectable()
export class CountriesDbState {
  constructor(private apiService: DemoDataService) {}

  @Action(CountriesDbActions.LoadAll)
  public onLoad$(ctx: StateContext<CountriesDbStateModel>): Observable<SimpleNamedEntity[]> {
    return this.apiService.getCountries().pipe(
      tap(results => {

        ctx.patchState({
          lastUpdated: new Date(),
          items: results
        });
      })
    );
  }

}