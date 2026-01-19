
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { DataVisualizationComponent } from '@components/data-visualization.component';
import { DataTableComponent } from '@components/data-table.component';
import { DataGaugeComponent } from '@components/data-gauge.component';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { Observable } from 'rxjs';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-annual-planning-exploratory-visualization',
  standalone: true,
  imports: [CommonModule, DataVisualizationComponent, DataTableComponent, DataGaugeComponent, MessagesModule],
  styleUrls: ['./annual-planning-exploratory-visualization.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div *ngIf="annualPlanning$ | async as annualPlanning" class="flex flex-row">

      <div class="flex flex-col col">
        <ng-container *ngFor="let group of annualPlanning.preliminaryResults?.groups; let i = index;">

          <div class="row-title panel">
            <div *ngIf="i > 0" class="w-full h-[1px] bg-gray-300 my-4"></div>
            <div class="text-3xl font-bold">{{ group.title }}</div>
          </div>

          <div class="bg-gray-200 rounded p-3 m-2" *ngIf="group.messageDetail">
            <i class="fa-solid fa-circle-info"></i>
            <span class="ml-3">{{ group.messageDetail }}</span>
          </div>

          <div class="grid grid-nogutter items-center gap-4 px-2">
            <ng-container *ngFor="let gauge of group.gauges">
              <app-data-gauge class="panel col" [data]="gauge"></app-data-gauge>
            </ng-container>
          </div>

          <div class="row-visualization">
            <ng-container *ngFor="let visualization of group.visualizations">
              <app-data-visualization class="panel custom-col-span-6" [data]="visualization" [maintainAspectRatio]="false" [aspectRatio]="1"></app-data-visualization>
            </ng-container>

            <ng-container *ngFor="let summary of group.summaries">
              <app-data-table class="panel custom-col-span-6" [data]="summary"></app-data-table>
            </ng-container>
          </div>

        </ng-container>

      </div>

    </div>
    `
})
export class AnnualPlanningExploratoryVisualizationComponent {
  public readonly annualPlanning$: Observable<AnnualPlanningDetails> = inject(Store).select(AnnualPlanningsFtSelectors.getDetails);
}