import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { AnnualPlanningStatus, AnnualPlanningStatusDescription } from '@models/annual-planning-status';
import { NgxSmzTablesModule, SmzTableState } from '@ngx-smz/core';
import { getInspectionDataTableState } from './tables/inspection-data-table-state';
import { getRtiDataTableState } from './tables/rti-data-table-state';
import { getWeatherDataTableState } from './tables/weather-data-table-state';
import { Select, Store } from '@ngxs/store';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { Observable } from 'rxjs';
import { AnnualPlanningPrivacy, AnnualPlanningPrivacyDescription } from '@models/annual-planning-privacy';
import { DataTableComponent } from '@components/data-table.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-annual-planning-general-data',
  standalone: true,
  imports: [CommonModule,
    AccordionModule,
    NgxSmzTablesModule,
    DataTableComponent,
    TooltipModule
  ],
  styleUrls: ['./annual-planning-general-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './annual-planning-general-data.component.html'
})

export class AnnualPlanningGeneralDataComponent {
  private readonly store: Store = inject(Store);
  public readonly annualPlanning$: Observable<AnnualPlanningDetails> = this.store.select(AnnualPlanningsFtSelectors.getDetails);
  public readonly hasWeatherDataErrors$: Observable<boolean> = this.store.select(AnnualPlanningsFtSelectors.hasWeatherDataErrors);

  public inspectionDataTableState: SmzTableState = getInspectionDataTableState(this.store);
  public rtiDataTableState: SmzTableState = getRtiDataTableState(this.store);
  public weatherDataTableState: SmzTableState = getWeatherDataTableState(this.store);

  public getPlanningStatus(status: AnnualPlanningStatus): string {
    return AnnualPlanningStatusDescription[status];
  }

  public getPlanningPrivacy(privacy: AnnualPlanningPrivacy): string {
    return AnnualPlanningPrivacyDescription[privacy];
  }
}

