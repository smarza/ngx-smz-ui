
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { TabViewModule } from 'primeng/tabview';
import { CorrosionGoalScenarioSettingsComponent } from './components/scenario-settings/components/corrosion-goal-scenario-settings.component';
import { ScenarioPaintingPlanComponent } from './components/panting-plan/scenario-panting-plan.component';
import { ActivatedRoute } from '@angular/router';
import { ToastActions, routerParamsListener } from '@ngx-smz/core';
import { ScenariosFtSelectors } from '@state/features/scenarios/scenarios.selectors';
import { Observable } from 'rxjs';
import { ScenarioDetails } from '@models/scenario-details';
import { ScenariosFtActions } from '@state/features/scenarios/scenarios.actions';
import { Navigate } from '@ngxs/router-plugin';
import { ANNUAL_PLANNING_DETAILS_PAGE_ROUTE } from '@routes';
import { ScenarioStatus } from '@models/scenario-status';
import { AvailableManHourScenarioSettingsComponent } from './components/scenario-settings/components/available-man-hour-scenario-settings.component';
import { CriticityScenarioSettingsComponent } from './components/scenario-settings/components/criticity-scenario-settings.component';
import { PrioritizationScenarioSettingsComponent } from './components/scenario-settings/components/prioritization-scenario-settings.component';
import { RtiScenarioSettingsComponent } from './components/scenario-settings/components/rti-scenario-settings.component';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ScenarioResultsVisualizationComponent } from './components/scenario-results/scenario-results.component';

export interface AnnualPlanningScenarioDetailsPageComponentRouteEvent {
  annualPlanningId?: string;
  scenarioId?: string;
}

@Component({
  selector: 'app-annual-planning-scenario-details-page',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    CorrosionGoalScenarioSettingsComponent,
    AvailableManHourScenarioSettingsComponent,
    CriticityScenarioSettingsComponent,
    PrioritizationScenarioSettingsComponent,
    RtiScenarioSettingsComponent,
    ScenarioPaintingPlanComponent,
    ScenarioResultsVisualizationComponent
  ],
  encapsulation: ViewEncapsulation.None,
  template: `

@if (scenario$ | async; as scenario) {
  @if (planning$ | async) {
    <p-tabView class="col-12">
      <!-- CONFIGURAÇÕES -->
      <p-tabPanel  header="Configurações">
        <ng-template pTemplate="details" let-item let-type="strategyName">
          @switch (scenario.strategyName) {
            @case ('CorrosionGoalStrategy') {
              <app-corrosion-goal-scenario-settings [scenario]="scenario"></app-corrosion-goal-scenario-settings>
            }
            @case ('AvailableManHourStrategy') {
              <app-available-man-hour-scenario-settings [scenario]="scenario"></app-available-man-hour-scenario-settings>
            }
            @case ('CriticityStrategy') {
              <app-criticity-scenario-settings [scenario]="scenario"></app-criticity-scenario-settings>
            }
            @case ('PrioritizationStrategy') {
              <app-prioritization-scenario-settings [scenario]="scenario"></app-prioritization-scenario-settings>
            }
            @case ('RtiStrategy') {
              <app-rti-scenario-settings [scenario]="scenario"></app-rti-scenario-settings>
            }
          }
        </ng-template>
      </p-tabPanel>
      <!-- PLANO -->
      <p-tabPanel  header="Plano">
        <app-scenario-panting-plan [scenario]="scenario"></app-scenario-panting-plan>
      </p-tabPanel>
      <!-- RESULTADOS -->
      <p-tabPanel  header="Resultados">
        <app-scenario-results-visualization [scenario]="scenario"></app-scenario-results-visualization>
      </p-tabPanel>
    </p-tabView>
  }
}
`,
  styles: [`
    app-annual-planning-scenario-details-page {
      .p-tabview-panels { padding: 0 !important; }
    }
  `]
})
export class AnnualPlanningScenarioDetailsPageComponent {

  private readonly store: Store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  public readonly scenario$: Observable<ScenarioDetails> = this.store.select(ScenariosFtSelectors.getDetails);
  public readonly planning$: Observable<AnnualPlanningDetails> = this.store.select(AnnualPlanningsFtSelectors.getDetails);
  public scenarioId: string;
  public routeEvent: AnnualPlanningScenarioDetailsPageComponentRouteEvent = {};

  constructor() {
    this.store.dispatch(new ScenariosFtActions.Clear);

    routerParamsListener('app-annual-planning-scenario-details-page', this.route, (event: AnnualPlanningScenarioDetailsPageComponentRouteEvent) => {
      if (event?.annualPlanningId !== this.routeEvent?.annualPlanningId) {
        const planning = this.store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);
        if (planning == null){
          this.store.dispatch(new AnnualPlanningsFtActions.LoadSingleAnnualPlanning(event?.annualPlanningId));
        }
      }

      if (event?.scenarioId !== this.routeEvent?.scenarioId) {
        this.store.dispatch(new ScenariosFtActions.LoadSingleScenario(event?.scenarioId)).subscribe(() => {
          const scenario = this.store.selectSnapshot(ScenariosFtSelectors.getDetails);
          if (scenario.status !== ScenarioStatus.SCENARIO_RESULTS_CALCULATION_FAILED &&
              scenario.status !== ScenarioStatus.SCENARIO_RESULTS_CALCULATION_SUCCEEDED) {
            this.store.dispatch(new ScenariosFtActions.Clear);
            this.store.dispatch(new Navigate(ANNUAL_PLANNING_DETAILS_PAGE_ROUTE));
            this.store.dispatch(new ToastActions.Info('Cenário atual se encontra em um estado que a página de detalhes não pode ser carregada.'));
          }
        });
      }
      else {
        this.store.dispatch(new Navigate(ANNUAL_PLANNING_DETAILS_PAGE_ROUTE));
      }
    });
  }

}