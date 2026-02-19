import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngxs/store';
import { ScenarioResultsVisualizationComponent } from '@pages/annual-planning-scenario-details/components/scenario-results/scenario-results.component';
import { NgVarModule } from '@ngx-smz/core';
import { SCENARIO_STRATEGY_COLORS } from '../scenarios/scenario-strategy-colors';

@Component({
  selector: 'app-annual-planning-painting-plan-results',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgVarModule,
    ScenarioResultsVisualizationComponent
  ],
  template: `
  @if (annualPlanning.selectedPlan) {
    <div class="grid grid-nogutter items-start justify-start flex-gap-1 w-full">
      <ng-container *ngVar="scenarioStrategyColors[annualPlanning.selectedPlan.strategyName] as scenarioColor">
        <div class="col-12 grid grid-nogutter flex-col items-start justify-start flex-gap-1">
          <div class="m-4 grid grid-nogutter items-center justify-center gap-4">
            <h2 class="m-0">{{ annualPlanning.selectedPlan.name }}</h2>
            <div class="text-sm border border-gray-300 rounded-md p-2" [ngClass]="scenarioColor.background">
              <span [ngClass]="scenarioColor.text">{{ annualPlanning.selectedPlan.strategyDisplayName }}</span>
            </div>
          </div>
          <app-scenario-results-visualization class="w-full" [scenario]="annualPlanning.selectedPlan"></app-scenario-results-visualization>
        </div>
      </ng-container>
    </div>
  } @else {
    <div class="relative h-[calc(100vh-205px)]">
      <div class="absolute inset-0">
        <div class="grid grid-nogutter flex-col items-center justify-center h-full">
          <i class="fa-solid fa-circle-info text-6xl"></i>
          <h4 class="font-bold mb-2">Nenhum plano de pintura foi eleito ainda</h4>
          <p class="text-lg">Eleja um cenário na aba contendo a lista de cenários</p>
        </div>
      </div>
    </div>
  }
  
  `
})
export class AnnualPlanningPaintingPlanResultsComponent {

  private readonly store = inject(Store);
  @Input() public annualPlanning: AnnualPlanningDetails;
  public scenarioStrategyColors = SCENARIO_STRATEGY_COLORS;

}