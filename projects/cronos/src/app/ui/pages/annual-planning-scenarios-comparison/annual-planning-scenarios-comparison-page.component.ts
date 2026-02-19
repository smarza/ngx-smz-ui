import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { NgVarModule, routerParamsListener } from '@ngx-smz/core';
import { ScenarioComparisonActions } from '@state/features/scenario-comparison/scenario-comparison.actions';
import { ScenarioComparison } from '@models/scenario-comparison';
import { ScenarioComparisonSelectors } from '@state/features/scenario-comparison/scenario-comparison.selectors';
import { Observable } from 'rxjs';
import { ScenarioResultsVisualizationComponent } from '@pages/annual-planning-scenario-details/components/scenario-results/scenario-results.component';
import { SCENARIO_STRATEGY_COLORS } from '@pages/annual-planning-details/components/scenarios/scenario-strategy-colors';

export interface AnnualPlanningScenariosComparisonPageComponentRouteEvent {
  scenarioAId: string;
  scenarioBId: string;
}

@Component({
  selector: 'annual-planning-scenarios-comparison-page',
  standalone: true,
  imports: [CommonModule, ScenarioResultsVisualizationComponent, NgVarModule],
  template: `
    <div>
    
      @if (loading$ | async; as loading) {
        <p>Carregando...</p>
      }
    
      @if (error$ | async; as error) {
        <p>Erro: {{ error }}</p>
      }
    
      @if (comparison$ | async; as comparison) {
        <div class="grid grid-nogutter items-start justify-start flex-gap-1 w-full">
          @for (scenario of comparison.scenarios; track scenario) {
            <ng-container *ngVar="scenarioStrategyColors[scenario.strategyName] as scenarioColor">
              <div class="col-6 grid grid-nogutter flex-col items-start justify-start flex-gap-1">
                <div class="m-4 grid grid-nogutter items-center justify-center gap-4">
                  <h2 class="m-0">{{ scenario.name }}</h2>
                  <div class="text-sm border border-gray-300 rounded-md p-2" [ngClass]="scenarioColor.background">
                    <span [ngClass]="scenarioColor.text">{{ scenario.strategyDisplayName }}</span>
                  </div>
                </div>
                <app-scenario-results-visualization [scenario]="scenario"></app-scenario-results-visualization>
              </div>
            </ng-container>
          }
        </div>
      }
    
    </div>
    `
})
export class AnnualPlanningScenariosComparisonPageComponent {
  private readonly store: Store = inject(Store);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  public readonly comparison$: Observable<ScenarioComparison> = this.store.select(ScenarioComparisonSelectors.comparison);
  public readonly loading$: Observable<boolean> = this.store.select(ScenarioComparisonSelectors.loading);
  public readonly error$: Observable<string | null> = this.store.select(ScenarioComparisonSelectors.error);
  public scenarioAId: string;
  public scenarioBId: string;
  public scenarioStrategyColors = SCENARIO_STRATEGY_COLORS;

  constructor() {
    // TODO: alterar para routerParamsDispatch quando for implementar a funcionalidade
    // Dessa forma, não precisaremos mais do routerParamsListener
    // e poderemos usar o routerParamsDispatch para executar a ação de comparar cenários
    // passando os ids dos cenários a serem comparados
    routerParamsListener(AnnualPlanningScenariosComparisonPageComponent.name, this.route, (event: AnnualPlanningScenariosComparisonPageComponentRouteEvent) => {
      // TODO: validar se o evento tem os parametros obrigatórios
      this.scenarioAId = event.scenarioAId;
      this.scenarioBId = event.scenarioBId;

      if (this.scenarioAId && this.scenarioBId) {
        this.store.dispatch(new ScenarioComparisonActions.Load([this.scenarioAId, this.scenarioBId]));
      }
    });
  }
}