import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickStopPropagationModule, Confirmable, NgVarModule, NgxSmzDataPipesModule, RbkAccessControlModule } from '@ngx-smz/core';
import { NgPipesModule } from 'ngx-pipes';
import { ScenarioListItem } from '@models/scenario-list-item';
import { AnnualPlanningScenarioDetailsPageComponentRouteEvent } from '@pages/annual-planning-scenario-details/annual-planning-scenario-details-page.component';
import { Navigate } from '@ngxs/router-plugin';
import { ANNUAL_PLANNING_SCENARIO_DETAILS_PAGE_ROUTE } from '@routes';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { ScenarioStatus, ScenarioStatusDescription } from '@models/scenario-status';
import { SCENARIO_STRATEGY_COLORS } from '../scenario-strategy-colors';
import { ButtonModule } from 'primeng/button';
import { SelectPaintingPlan } from '@models/select-painting-plan';
import { TooltipModule } from 'primeng/tooltip';
import { ClaimDefinitions } from '@models/claim-definitions';

@Component({
  selector: 'app-scenario-back-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
    NgPipesModule,
    NgVarModule,
    NgxSmzDataPipesModule,
    ClickStopPropagationModule,
    RbkAccessControlModule
  ],
  host: { class: 'relative' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ng-container *ngVar="scenarioStrategyColors[data.strategyName] as scenarioColor">
    <div class="rounded-2xl absolute inset-0 drop-shadow-md" [ngClass]="scenarioColor.background"></div>

    <div class="max-w-sm mx-auto relative" [ngClass]="scenarioColor.text">

      <div class="text-center p-4 rounded-t-2xl" [ngClass]="scenarioColor.background">
        <div class="text-2xl font-bold">
        {{ data.strategyDisplayName }}
        <i *ngIf="data.isSelectedPlan" class="fa-solid fa-star ml-2" pTooltip="Plano de pintura eleito"></i>
        </div>
      </div>

      <div class="grid grid-nogutter items-start justify-between flex-col gap-3 p-6 rounded-2xl shadow-inset bg-gradient-to-b from-[#d8d8d8] to-[#acacac]">

        <button
          pButton
          class="justify-center w-full gap-2 py-2 rounded-2xl bg-slate-700 text-white"
          label="Ver Detalhes"
          icon="fa-solid fa-chart-line"
          clickStopPropagation
          [disabled]="!canAccessScenarioPage()"
          (click)="navigateToScenarioDetailsPageRoute()">
        </button>

        @if(!data.isSelectedPlan) {
          <button
            pButton
            class="justify-center w-full gap-2 py-2 rounded-2xl bg-slate-700 text-white"
            label="Eleger Plano"
            icon="fa-solid fa-star"
            clickStopPropagation
            [disabled]="!canSelectPlan() || !(manageAnnualPlanningClaim | rbkCanAccess)"
            (click)="selectPlan()">
          </button>
        }
        @else {
          <button
            pButton
            class="justify-center w-full gap-2 py-2 rounded-2xl bg-slate-700 text-white"
            label="Desselecionar Plano"
            icon="fa-regular fa-star"
            clickStopPropagation
            [disabled]="!canSelectPlan() || !(manageAnnualPlanningClaim | rbkCanAccess)"
            (click)="deselectPlan()">
          </button>
        }

        <button
          pButton
          class="justify-center w-full gap-2 py-2 rounded-2xl bg-slate-700 text-white"
          label="Recalcular"
          icon="fa-solid fa-calculator"
          clickStopPropagation
          [disabled]="!canAccessScenarioPage() || !(manageAnnualPlanningClaim | rbkCanAccess)"
          (click)="data.isSelectedPlan ? confirmPlanRecalculation() : confirmScenarioRecalculation()">
        </button>

        <button
          pButton
          class="justify-center w-full gap-2 py-2 rounded-2xl bg-slate-700 text-white"
          label="Remover"
          icon="fa-solid fa-trash"
          clickStopPropagation
          [disabled]="!canAccessScenarioPage() || !(manageAnnualPlanningClaim | rbkCanAccess)"
          (click)="data.isSelectedPlan ? removeSelectedPlan() : removeScenario()">
        </button>

      </div>
    </div>

  </ng-container>
  `,
  styles: [`
    app-scenario-back-card {
      .p-button-label { flex: unset; }
    }
  `]
})
export class ScenarioBackCardComponent {
  private readonly store: Store = inject(Store);
  @Input() public data: ScenarioListItem;
  public scenarioStatusDescription = ScenarioStatusDescription;
  public scenarioStrategyColors = SCENARIO_STRATEGY_COLORS;
  public manageAnnualPlanningClaim = ClaimDefinitions.MANAGE_ANNUAL_PLANNING;

  @Confirmable('Tem certeza que deseja apagar o cenário?', 'Remover Cenário')
  public removeScenario(): void {
    this.store.dispatch(new AnnualPlanningsFtActions.DeleteScenario(this.data.id));
  }

  @Confirmable('Este é o atual plano de pintura eleito. Tem certeza que deseja apagar o cenário?', 'Remover Cenário Eleito', true)
  public removeSelectedPlan(): void {
    this.store.dispatch(new AnnualPlanningsFtActions.DeleteScenario(this.data.id));
  }

  public selectPlan(): void {
    const data: SelectPaintingPlan = { annualPlanningId: this.data.planningId, scenarioId: this.data.id, isSelected: true };
    this.store.dispatch(new AnnualPlanningsFtActions.SelectPlan(data));
  }

  public deselectPlan(): void {
    const data: SelectPaintingPlan = { annualPlanningId: this.data.planningId, scenarioId: this.data.id, isSelected: false };
    this.store.dispatch(new AnnualPlanningsFtActions.SelectPlan(data));
  }

  public navigateToScenarioDetailsPageRoute(): void {
    const params: AnnualPlanningScenarioDetailsPageComponentRouteEvent = { annualPlanningId: this.data.planningId, scenarioId: this.data.id };
    this.store.dispatch(new Navigate([ ANNUAL_PLANNING_SCENARIO_DETAILS_PAGE_ROUTE.join('/'), params ]));
  }

  public canAccessScenarioPage(): boolean {
    return this.data.status === ScenarioStatus.SCENARIO_RESULTS_CALCULATION_SUCCEEDED ||
           this.data.status === ScenarioStatus.SCENARIO_RESULTS_CALCULATION_FAILED;
  }

  public canSelectPlan(): boolean {
    return this.data.status === ScenarioStatus.SCENARIO_RESULTS_CALCULATION_SUCCEEDED;
  }

  @Confirmable('Esse cenário é o atual plano eleito. Ao recalcular, todas as customizações do plano serão perdidas e o cenário deixará de ser o plano eleito.' +
    '<br><br> Tem certeza que deseja continuar?', 'Recalcular Plano Eleito', true)
  public confirmPlanRecalculation(): void {
    this.store.dispatch(new AnnualPlanningsFtActions.CalculateScenarioResults({scenarioId: this.data.id}));
  }

  @Confirmable('Todas as customizações do plano serão perdidas.' +
    '<br><br> Tem certeza que deseja continuar?', 'Recalcular Cenário', true)
  public confirmScenarioRecalculation(): void {
    this.store.dispatch(new AnnualPlanningsFtActions.CalculateScenarioResults({scenarioId: this.data.id}));
  }
}
