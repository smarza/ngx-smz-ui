import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { ScenariosService } from '@services/api/scenarios.service';
import { ScenarioComparisonActions } from './scenario-comparison.actions';
import { ScenarioComparison } from '@models/scenario-comparison';
import { HttpErrorResponse } from '@angular/common/http';

export const SCENARIO_COMPARISON_STATE_NAME = 'scenarioComparisonState';

export interface ScenarioComparisonStateModel {
  item: ScenarioComparison | null;
  loading: boolean;
  error: string | null;
}

export const getInitialScenarioComparisonState = (): ScenarioComparisonStateModel => ({
  item: null,
  loading: false,
  error: null
});

@State<ScenarioComparisonStateModel>({
  name: SCENARIO_COMPARISON_STATE_NAME,
  defaults: getInitialScenarioComparisonState()
})

@Injectable()
export class ScenarioComparisonState {
  constructor(private readonly apiService: ScenariosService) { }

  @Action(ScenarioComparisonActions.Load)
  public onLoad$(ctx: StateContext<ScenarioComparisonStateModel>, action: ScenarioComparisonActions.Load): Observable<ScenarioComparison> {
    ctx.patchState({ loading: true, item: null, error: null });
    ctx.dispatch(new ScenarioComparisonActions.Clear());
    return this.apiService.compareScenariosAsync({ scenarioIds: action.ids }).pipe(
      tap((result: ScenarioComparison) => {
        ctx.patchState({
          item: result
        });
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        const errors: string[] = errorResponse.error?.errors;
        ctx.patchState({ error: errors.join(', ') });
        return of(null);
      }),
      finalize(() => {
        ctx.patchState({ loading: false });
      })
    );
  }

  @Action(ScenarioComparisonActions.Clear)
  public clear(ctx: StateContext<ScenarioComparisonStateModel>): void {
    ctx.patchState(getInitialScenarioComparisonState());
  }
}

