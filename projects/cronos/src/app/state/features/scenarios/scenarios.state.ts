import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ToastActions } from '@ngx-smz/core';
import { ScenariosService } from '@services/api/scenarios.service';
import { ScenariosFtActions } from './scenarios.actions';
import { ScenarioDetails } from '@models/scenario-details';
import { ScenarioListItem } from '@models/scenario-list-item';

export const SCENARIOS_FT_STATE_NAME = 'scenariosFtState';

export interface ScenariosFtStateModel {
  item: ScenarioDetails;
}

export const getInitialScenariosFtState = (): ScenariosFtStateModel => ({
  item: null
});

@State<ScenariosFtStateModel>({
  name: SCENARIOS_FT_STATE_NAME,
  defaults: getInitialScenariosFtState()
})

@Injectable()
export class ScenariosFtState {
  constructor(private readonly apiService: ScenariosService) { }


  @Action(ScenariosFtActions.LoadSingleScenario)
  public onLoadSingle$(ctx: StateContext<ScenariosFtStateModel>, action: ScenariosFtActions.LoadSingleScenario): Observable<ScenarioDetails> {
    return this.apiService.getScenarioDetailsAsync(action.id).pipe(
      tap((result: ScenarioDetails) => {
        ctx.patchState({
          item: result
        });
      })
    );
  }

  @Action(ScenariosFtActions.UpdateScenarioWithCorrosionGoalStrategy)
  public updateScenarioWithCorrosionGoalStrategy$(ctx: StateContext<ScenariosFtStateModel>, action: ScenariosFtActions.UpdateScenarioWithCorrosionGoalStrategy): Observable<void> {
    return this.apiService.updateWithCorrosionGoalStrategyAsync(action.data).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Cenário atualizado com sucesso'));
        ctx.dispatch(ScenariosFtActions.Clear);
      })
    );
  }

  @Action(ScenariosFtActions.UpdateScenarioWithAvailableManHourStrategy)
  public updateScenarioWithAvailableManHourStrategy$(ctx: StateContext<ScenariosFtStateModel>, action: ScenariosFtActions.UpdateScenarioWithAvailableManHourStrategy): Observable<void> {
    return this.apiService.updateWithAvailableManHourStrategyAsync(action.data).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Cenário atualizado com sucesso'));
        ctx.dispatch(ScenariosFtActions.Clear);
      })
    );
  }

  @Action(ScenariosFtActions.UpdateScenarioWithCriticityStrategy)
  public updateScenarioWithCriticityStrategy$(ctx: StateContext<ScenariosFtStateModel>, action: ScenariosFtActions.UpdateScenarioWithCriticityStrategy): Observable<void> {
    return this.apiService.updateWithCriticityStrategyAsync(action.data).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Cenário atualizado com sucesso'));
        ctx.dispatch(ScenariosFtActions.Clear);
      })
    );
  }

  @Action(ScenariosFtActions.UpdateScenarioWithPrioritizationStrategy)
  public updateScenarioWithPrioritizationStrategy$(ctx: StateContext<ScenariosFtStateModel>, action: ScenariosFtActions.UpdateScenarioWithPrioritizationStrategy): Observable<void> {
    return this.apiService.updateWithPrioritizationStrategyAsync(action.data).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Cenário atualizado com sucesso'));
        ctx.dispatch(ScenariosFtActions.Clear);
      })
    );
  }

  @Action(ScenariosFtActions.UpdateScenarioWithRtiStrategy)
  public updateScenarioWithRtiStrategy$(ctx: StateContext<ScenariosFtStateModel>, action: ScenariosFtActions.UpdateScenarioWithRtiStrategy): Observable<void> {
    return this.apiService.updateWithRtiStrategyAsync(action.data).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Cenário atualizado com sucesso'));
        ctx.dispatch(ScenariosFtActions.Clear);
      })
    );
  }

  @Action(ScenariosFtActions.UpdateScenarioPostOptimization)
  public updateScenarioPostOptimizationAsync$(ctx: StateContext<ScenariosFtStateModel>, action: ScenariosFtActions.UpdateScenarioPostOptimization): Observable<ScenarioListItem> {
    return this.apiService.updateScenarioPostOptimizationAsync(action.data).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Hidrojatos atualizados com sucesso'));
        ctx.dispatch(ScenariosFtActions.Clear);
      })
    );
  }

  @Action(ScenariosFtActions.Clear)
  public clear(ctx: StateContext<ScenariosFtStateModel>): void {
    ctx.patchState(getInitialScenariosFtState());
  }
}

