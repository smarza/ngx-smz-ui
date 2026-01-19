import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { ScenarioDetails } from '@models/scenario-details';
import { DataVisualizationComponent } from '@components/data-visualization.component';
import { DataTableComponent } from '@components/data-table.component';
import { DataGaugeComponent } from '@components/data-gauge.component';
import { ScenarioPaintingPlan } from '@models/scenario-painting-plan';

@Component({
  selector: 'app-scenario-results-visualization',
  standalone: true,
  imports: [CommonModule, DataVisualizationComponent, DataTableComponent, DataGaugeComponent, MessagesModule],
  templateUrl: './scenario-results.component.html',
  styleUrls: ['./scenario-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ScenarioResultsVisualizationComponent {
  @Input() public scenario: ScenarioDetails | ScenarioPaintingPlan;
}