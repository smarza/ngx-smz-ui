
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { DataVisualizationComponent } from '@components/data-visualization.component';
import { DataTableComponent } from '@components/data-table.component';
import { DataGaugeComponent } from '@components/data-gauge.component';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { Observable } from 'rxjs';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-annual-planning-exploratory-visualization',
  standalone: true,
  imports: [CommonModule, DataVisualizationComponent, DataTableComponent, DataGaugeComponent, MessageModule],
  styleUrls: ['./annual-planning-exploratory-visualization.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (annualPlanning$ | async; as annualPlanning) {
      <div class="flex flex-row">
        <div class="flex flex-col col">
          @for (group of annualPlanning.preliminaryResults?.groups; track group; let i = $index) {
            <div class="row-title panel">
              @if (i > 0) {
                <div class="w-full h-[1px] bg-gray-300 my-4"></div>
              }
              <div class="text-3xl font-bold">{{ group.title }}</div>
            </div>
            @if (group.messageDetail) {
              <div class="bg-gray-200 rounded p-3 m-2">
                <i class="fa-solid fa-circle-info"></i>
                <span class="ml-3">{{ group.messageDetail }}</span>
              </div>
            }
            <div class="grid grid-nogutter items-center gap-4 px-2">
              @for (gauge of group.gauges; track gauge) {
                <app-data-gauge class="panel col" [data]="gauge"></app-data-gauge>
              }
            </div>
            <div class="row-visualization">
              @for (visualization of group.visualizations; track visualization) {
                <app-data-visualization class="panel custom-col-span-6" [data]="visualization" [maintainAspectRatio]="false" [aspectRatio]="1"></app-data-visualization>
              }
              @for (summary of group.summaries; track summary) {
                <app-data-table class="panel custom-col-span-6" [data]="summary"></app-data-table>
              }
            </div>
          }
        </div>
      </div>
    }
    `
})
export class AnnualPlanningExploratoryVisualizationComponent {
  public readonly annualPlanning$: Observable<AnnualPlanningDetails> = inject(Store).select(AnnualPlanningsFtSelectors.getDetails);
}