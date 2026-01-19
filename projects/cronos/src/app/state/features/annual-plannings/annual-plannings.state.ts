import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AnnualPlanningsService } from '@services/api/annual-plannings.service';
import { AnnualPlanningsFtActions } from './annual-plannings.actions';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ToastActions } from '@ngx-smz/core';
import { Navigate } from '@ngxs/router-plugin';
import { ANNUAL_PLANNING_LIST_PAGE_ROUTE } from '@routes';
import { AnnualPlanningsActions } from '@state/database/annual-plannings/annual-plannings.actions';
import { ScenariosService } from '@services/api/scenarios.service';
import { ScenarioListItem } from '@models/scenario-list-item';
import { UpdateInspectionDataFromSpreadsheetResponse } from '@models/update-inspection-data-from-spreadsheet-response';
import { AnnualPlanningHistory } from '@models/annual-planning-history';

export const ANNUAL_PLANNINGS_FT_STATE_NAME = 'annualPlanningsFtState';

export interface AnnualPlanningsFtStateModel {
  item: AnnualPlanningDetails;
  history: AnnualPlanningHistory[];
  errors: string[];
}

export const getInitialAnnualPlanningsFtState = (): AnnualPlanningsFtStateModel => ({
  item: null,
  history: [],
  errors: []
});


@State<AnnualPlanningsFtStateModel>({
  name: ANNUAL_PLANNINGS_FT_STATE_NAME,
  defaults: getInitialAnnualPlanningsFtState()
})

@Injectable()
export class AnnualPlanningsFtState {
  constructor(private readonly apiService: AnnualPlanningsService, private readonly scenarioApiService: ScenariosService) { }


  @Action(AnnualPlanningsFtActions.LoadSingleAnnualPlanning)
  public onLoadSingle$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.LoadSingleAnnualPlanning): Observable<AnnualPlanningDetails> {
    return this.apiService.getAnnualPlanningDetailsAsync(action.id).pipe(
      tap((result: AnnualPlanningDetails) => {
        ctx.patchState({
          item: result,
          errors: []
        });
      })
    );
  }

  @Action(AnnualPlanningsFtActions.LoadAnnualPlanningScenarios)
  public onLoadScenarioItems$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.LoadAnnualPlanningScenarios): Observable<ScenarioListItem[]> {
    return this.apiService.getAnnualPlanningScenarioListItemsAsync(action.planningId).pipe(
      tap((result: ScenarioListItem[]) => {
        ctx.patchState({
          item: {...ctx.getState().item, scenarios: result }
        });
      })
    );
  }

  @Action(AnnualPlanningsFtActions.LoadAnnualPlanningScenariosSilent)
  public onLoadScenarioItemsSilent$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.LoadAnnualPlanningScenariosSilent): Observable<ScenarioListItem[]> {
    return this.apiService
      .withParameters<AnnualPlanningsService>({ loadingBehavior: 'none' })
      .getAnnualPlanningScenarioListItemsAsync(action.planningId)
      .pipe(
        tap((result: ScenarioListItem[]) => {
          ctx.patchState({
            item: {...ctx.getState().item, scenarios: result }
          });
        })
      );
  }

  @Action(AnnualPlanningsFtActions.SelectPlan)
  public onSelectPlan$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.SelectPlan): Observable<AnnualPlanningDetails> {
    return this.apiService.selectPaintingPlan(action.selectPlan).pipe(
      tap((result: AnnualPlanningDetails) => {
        const message = result.selectedPlan !== null ? 'Plano de Pintura eleito com sucesso' : 'Plano de Pintura desselecionado';
        ctx.dispatch(new ToastActions.Success(message));
        ctx.patchState({
          item: result
        });
      })
    );
  }

  @Action(AnnualPlanningsFtActions.CreateScenarioWithCorrosionGoalStrategy)
  public createScenarioWithCorrosionGoalStrategy$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.CreateScenarioWithCorrosionGoalStrategy): Observable<ScenarioListItem> {
    return this.scenarioApiService.createWithCorrosionGoalStrategyAsync(action.data).pipe(
      tap((result: ScenarioListItem) => {
        ctx.dispatch(new ToastActions.Success('Cenário criado com sucesso'));
        ctx.patchState({
          item: {...ctx.getState().item, scenarios: [ ...ctx.getState().item.scenarios, result ] }
        });
      })
    );
  }

  @Action(AnnualPlanningsFtActions.CreateScenarioWithAvailableManHourStrategy)
  public createScenarioWithAvailableManHourStrategy$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.CreateScenarioWithAvailableManHourStrategy): Observable<ScenarioListItem> {
    return this.scenarioApiService.createWithAvailableManHourStrategyAsync(action.data).pipe(
      tap((result: ScenarioListItem) => {
        ctx.dispatch(new ToastActions.Success('Cenário criado com sucesso'));
        ctx.patchState({
          item: {...ctx.getState().item, scenarios: [ ...ctx.getState().item.scenarios, result ] }
        });
      })
    );
  }

  @Action(AnnualPlanningsFtActions.CreateScenarioWithCriticityStrategy)
  public createScenarioWithCriticityStrategy$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.CreateScenarioWithCriticityStrategy): Observable<ScenarioListItem> {
    return this.scenarioApiService.createWithCriticityStrategyAsync(action.data).pipe(
      tap((result: ScenarioListItem) => {
        ctx.dispatch(new ToastActions.Success('Cenário criado com sucesso'));
        ctx.patchState({
          item: {...ctx.getState().item, scenarios: [ ...ctx.getState().item.scenarios, result ] }
        });
      })
    );
  }

  @Action(AnnualPlanningsFtActions.CreateScenarioWithPrioritizationStrategy)
  public createScenarioWithPrioritizationStrategy$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.CreateScenarioWithPrioritizationStrategy): Observable<ScenarioListItem> {
    return this.scenarioApiService.createWithPrioritizationStrategyAsync(action.data).pipe(
      tap((result: ScenarioListItem) => {
        ctx.dispatch(new ToastActions.Success('Cenário criado com sucesso'));
        ctx.patchState({
          item: {...ctx.getState().item, scenarios: [ ...ctx.getState().item.scenarios, result ] }
        });
      })
    );
  }

  @Action(AnnualPlanningsFtActions.CreateScenarioWithRtiStrategy)
  public createScenarioWithRtiStrategy$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.CreateScenarioWithRtiStrategy): Observable<ScenarioListItem> {
    return this.scenarioApiService.createWithRtiStrategyAsync(action.data).pipe(
      tap((result: ScenarioListItem) => {
        ctx.dispatch(new ToastActions.Success('Cenário criado com sucesso'));
        ctx.patchState({
          item: {...ctx.getState().item, scenarios: [ ...ctx.getState().item.scenarios, result ] }
        });
      })
    );
  }

  @Action(AnnualPlanningsFtActions.DeleteScenario)
  public deleteScenario$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.DeleteScenario): Observable<void> {
    return this.scenarioApiService.deleteAsync(action.id).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Cenário excluído com sucesso'));
        if (ctx.getState().item.selectedPlan != null && ctx.getState().item.selectedPlan.id === action.id) {
          ctx.dispatch(new AnnualPlanningsActions.Clear);
          ctx.dispatch(new AnnualPlanningsFtActions.LoadSingleAnnualPlanning(ctx.getState().item.id));
        }
        else {
          ctx.patchState({
            item: {...ctx.getState().item, scenarios: [ ...ctx.getState().item.scenarios.filter(x => x.id !== action.id) ] }
          });
        }
      })
    );
  }

  @Action(AnnualPlanningsFtActions.UpdateInspectionDataFromSpreadsheet)
  public updateInspectionDataFromSpreadsheet$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.UpdateInspectionDataFromSpreadsheet): Observable<UpdateInspectionDataFromSpreadsheetResponse> {
    return this.apiService.updateInspectionDataSpreadsheetAsync(action.data).pipe(
      tap((result: UpdateInspectionDataFromSpreadsheetResponse) => {
        if (result.errors.length > 0) {
          ctx.patchState({
            errors: result.errors
          });
        }
        else {
          ctx.patchState({
            item: result.annualPlanning,
            errors: []
          });
          ctx.dispatch(new AnnualPlanningsActions.Clear);
          ctx.dispatch(new ToastActions.Success('Dados de inspeção atualizados com sucesso'));
          ctx.dispatch(new Navigate(ANNUAL_PLANNING_LIST_PAGE_ROUTE));
        }
      })
    );
  }

  @Action(AnnualPlanningsFtActions.UpdateRtiData)
  public updateRtiData$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.UpdateRtiData): Observable<AnnualPlanningDetails> {
    return this.apiService.updateRtiDataAsync(action.data).pipe(
      tap((result: AnnualPlanningDetails) => {
        ctx.patchState({
          item: result
        });
        ctx.dispatch(new AnnualPlanningsActions.Clear);
        ctx.dispatch(new ToastActions.Success('Dados de RTI atualizados com sucesso'));
        ctx.dispatch(new Navigate(ANNUAL_PLANNING_LIST_PAGE_ROUTE));
      })
    );
  }

  @Action(AnnualPlanningsFtActions.CalculateScenarioResults)
  public calculateScenarioResultsAsync$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.CalculateScenarioResults): Observable<ScenarioListItem> {
    return this.scenarioApiService.calculateScenarioResultsAsync(action.data).pipe(
      tap((result: ScenarioListItem) => {
        ctx.dispatch(new ToastActions.Success('Cenário enviado para cálculo com sucesso.'));
        if (ctx.getState().item.selectedPlan != null && ctx.getState().item.selectedPlan.id === action.data.scenarioId) {
          ctx.dispatch(new AnnualPlanningsActions.Clear);
          ctx.dispatch(new AnnualPlanningsFtActions.LoadSingleAnnualPlanning(ctx.getState().item.id));
        }
        else {
          ctx.patchState({
            item: {...ctx.getState().item, scenarios: [ ...ctx.getState().item.scenarios.map(x => x.id !== result.id ? x : result) ] }
          });
        }
      })
    );
  }

  @Action(AnnualPlanningsFtActions.LoadHistory)
  public loadAll$(ctx: StateContext<AnnualPlanningsFtStateModel>, action: AnnualPlanningsFtActions.LoadHistory): Observable<AnnualPlanningHistory[]> {
    ctx.patchState({ history: [] });
    return this.apiService.getAnnualPlanningHistoryAsync(action.annualPlanningId).pipe(
      tap((result: AnnualPlanningHistory[]) => {
        ctx.patchState({
          history: result,
        });
      })
    );
  }

  @Action(AnnualPlanningsFtActions.Clear)
  public clear(ctx: StateContext<AnnualPlanningsFtStateModel>): void {
    ctx.patchState(getInitialAnnualPlanningsFtState());
  }
}

