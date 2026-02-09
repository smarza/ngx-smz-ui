import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgVarModule, NgxSmzDataPipesModule } from '@ngx-smz/core';
import { NgPipesModule } from 'ngx-pipes';
import { ScenarioListItem } from '@models/scenario-list-item';
import { ScenarioStatusDescription } from '@models/scenario-status';
import { SCENARIO_STRATEGY_COLORS } from '../scenario-strategy-colors';
import { SCENARIO_STATUS_ICONS } from '../scenario-status-icons';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-scenario-front-card',
  standalone: true,
  imports: [
    CommonModule,
    TooltipModule,
    NgPipesModule,
    NgVarModule,
    NgxSmzDataPipesModule
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
  <ng-container *ngVar="scenarioStrategyColors[data.strategyName] as scenarioColor">
    <div class="rounded-2xl absolute inset-0 bg-[#e2e2e2]"></div>
  
    <div class="max-w-sm mx-auto relative" [ngClass]="scenarioColor.text">
  
      <div class="text-center p-4 rounded-t-2xl bg-gradient-to-b from-[#eeeeee] to-[#e2e2e2]">
        <div class="text-2xl font-bold text-slate-700">
          {{ data.strategyDisplayName }}
          @if (data.isSelectedPlan) {
            <i class="fa-solid fa-star ml-2" pTooltip="Plano de pintura eleito"></i>
          }
        </div>
      </div>
  
      <div class="grid grid-nogutter items-start justify-between flex-col gap-3 p-6 rounded-2xl shadow-inset min-h-[215px]" [ngClass]="scenarioColor.gradient">
  
        <div class="text-lg font-bold">{{ data.name }}</div>
  
        <div class="flex items-center">
          <i class="fas fa-calendar-alt"></i>
          <span class="text-sm pt-1 ml-2">{{ data.creationDate | simpleCalendar : 'fromNow' }}</span>
        </div>
  
        <div class="col"></div>
  
        <div class="flex items-center">
          <i [ngClass]="scenarioStatusIcons[data.status]"></i>
          <span class="text-sm pt-1 ml-2 font-bold">{{ scenarioStatusDescription[data.status] }}</span>
        </div>
  
      </div>
    </div>
  </ng-container>
  `,
})
export class ScenarioFrontCardComponent {
  @Input() public data: ScenarioListItem;
  public scenarioStatusDescription = ScenarioStatusDescription;
  public scenarioStrategyColors = SCENARIO_STRATEGY_COLORS;
  public scenarioStatusIcons = SCENARIO_STATUS_ICONS;
}