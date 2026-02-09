
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { TabViewModule } from 'primeng/tabview';
import { AnnualPlanningGeneralDataComponent } from './components/general-data/annual-planning-general-data.component';
import { AnnualPlanningExploratoryVisualizationComponent } from './components/exploratory-visualization/annual-planning-exploratory-visualization.component';
import { AnnualPlanningScenariosComponent } from './components/scenarios/annual-planning-scenarios.component';
import { AnnualPlanningPaintingPlanComponent } from './components/painting-plan/annual-planning-painting-plan.component';
import { AnnualPlanningPaintingPlanResultsComponent } from './components/painting-plan-results/annual-planning-painting-plan-results.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastActions, routerParamsListener } from '@ngx-smz/core';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { AnnualPlanningStatus } from '@models/annual-planning-status';
import { ANNUAL_PLANNING_LIST_PAGE_ROUTE } from '@routes';
import { Navigate } from '@ngxs/router-plugin';
import { ScenariosFtSelectors } from '@state/features/scenarios/scenarios.selectors';
import { ScenarioDetails } from '@models/scenario-details';

interface RouteEvent { planningId?: string; }

@Component({
  selector: 'app-annual-planning-details-page',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    AnnualPlanningGeneralDataComponent,
    AnnualPlanningExploratoryVisualizationComponent,
    AnnualPlanningScenariosComponent,
    AnnualPlanningPaintingPlanComponent,
    AnnualPlanningPaintingPlanResultsComponent
  ],
  template: `
@if (annualPlanning$ | async; as annualPlanning) {
  <p-tabView class="w-full" [(activeIndex)]="activeIndex">
    <!-- DADOS GERAIS -->
    <p-tabPanel>
      <ng-template pTemplate="header">
        <div class="flex items-center gap-2">
          <div>Dados Gerais</div>
        </div>
      </ng-template>
      <app-annual-planning-general-data></app-annual-planning-general-data>
    </p-tabPanel>
    <!-- VISUALIZAÇÃO EXPLORATÓRIA -->
    <p-tabPanel [disabled]="annualPlanning.status == annualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED">
      <ng-template pTemplate="header">
        <div class="flex items-center gap-2">
          <div>Visualização Exploratória</div>
        </div>
      </ng-template>
      @if (annualPlanning.status != annualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED) {
        <app-annual-planning-exploratory-visualization></app-annual-planning-exploratory-visualization>
      }
    </p-tabPanel>
    <!-- CENÁRIOS -->
    <p-tabPanel [disabled]="annualPlanning.status == annualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED">
      <ng-template pTemplate="header">
        <div class="flex items-center gap-2">
          <div>Cenários</div>
        </div>
      </ng-template>
      @if (annualPlanning.status != annualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED) {
        <app-annual-planning-scenarios [annualPlanningId]="annualPlanning.id"></app-annual-planning-scenarios>
      }
    </p-tabPanel>
    <!-- PLANO DE PINTURA -->
    <p-tabPanel [disabled]="annualPlanning.status == annualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED">
      <ng-template pTemplate="header">
        <div class="flex items-center gap-2">
          <div>Plano de Pintura</div>
          @if (annualPlanning.selectedPlan != null) {
            <i class="fa-solid fa-check text-green-500"></i>
          }
        </div>
      </ng-template>
      @if (annualPlanning.status != annualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED) {
        <app-annual-planning-painting-plan [annualPlanning]="annualPlanning"></app-annual-planning-painting-plan>
      }
    </p-tabPanel>
    <!-- RESULTADOS DO PLANO DE PINTURA -->
    <p-tabPanel [disabled]="annualPlanning.status == annualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED">
      <ng-template pTemplate="header">
        <div class="flex items-center gap-2">
          <div>Resultados do Plano de Pintura</div>
          @if (annualPlanning.selectedPlan != null) {
            <i class="fa-solid fa-check text-green-500"></i>
          }
        </div>
      </ng-template>
      @if (annualPlanning.status != annualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED) {
        <app-annual-planning-painting-plan-results [annualPlanning]="annualPlanning"></app-annual-planning-painting-plan-results>
      }
    </p-tabPanel>
  </p-tabView>
}
`
})
export class AnnualPlanningDetailsPageComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  public readonly annualPlanning$: Observable<AnnualPlanningDetails> = this.store.select(AnnualPlanningsFtSelectors.getDetails);
  public readonly scenarioDetails$: Observable<ScenarioDetails> = this.store.select(ScenariosFtSelectors.getDetails);
  public activeIndex = 0;
  public routeEvent: RouteEvent = {};
  public annualPlanningStatus = AnnualPlanningStatus;

  constructor() {
    this.store.dispatch(new AnnualPlanningsFtActions.Clear);

    routerParamsListener('app-annual-planning-details-page', this.route, (event: RouteEvent) => {
      if (event?.planningId !== this.routeEvent?.planningId) {
        this.store.dispatch(new AnnualPlanningsFtActions.LoadSingleAnnualPlanning(event?.planningId)).subscribe(() => {
          const planning = this.store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);
          if (planning.status === AnnualPlanningStatus.WAITING_PRE_EXPLORATORY_CALCULATION ||
              planning.status === AnnualPlanningStatus.CALCULATING_PRE_EXPLORATORY_VIEW ) {
            this.store.dispatch(new AnnualPlanningsFtActions.Clear);
            this.store.dispatch(new Navigate(ANNUAL_PLANNING_LIST_PAGE_ROUTE));
            this.store.dispatch(new ToastActions.Info('Planejamento Anual se encontra em um estado que a página de detalhes não pode ser carregada.'));
          }
        });
      }
      else {
        this.store.dispatch(new Navigate(ANNUAL_PLANNING_LIST_PAGE_ROUTE));
      }
    });
  }
}