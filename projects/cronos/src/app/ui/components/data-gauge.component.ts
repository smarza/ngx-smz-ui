import { Component, Input, OnInit } from '@angular/core';

import { SmzGaugeBuilder, SmzGaugeComponent, SmzGaugeState } from '@ngx-smz/core';
import { PanelModule } from 'primeng/panel';
import { of } from 'rxjs';
import { GaugeThreshold } from '@models/gauge-threshold';
import { GaugePanel } from '@models/gauge-panel';

@Component({
  selector: 'app-data-gauge',
  standalone: true,
  imports: [PanelModule, SmzGaugeComponent],
  template: `
    <p-panel [toggleable]="true" >
      <ng-template pTemplate="header">
        <div class="flex align-items-center gap-2">
          <span class="font-bold text-sm">{{ data?.title ?? '' }}</span>
        </div>
      </ng-template>
      @if (gaugeState != null) {
        <smz-ui-gauge [state]="gaugeState"></smz-ui-gauge>
      } @else {
        <div class="w-full h-full flex justify-center items-center">
          <p>Nenhum dado.</p>
        </div>
      }
    </p-panel>
    `
})
export class DataGaugeComponent implements OnInit {
  @Input() public data: GaugePanel;
  public gaugeState: SmzGaugeState;

  public ngOnInit(): void {
    this.gaugeState = new SmzGaugeBuilder()
      .withSize(150)
      .withTitleStyle('font-bold text-2xl')
      .withValue(of(this.data.currentValue))
      .withValueThrottleTime(300)
      .withDecimalPlaces(2, false)
      .withRange(this.data.minimumValue, this.data.maximumValue)
      .withUnit(this.data.unit)
      .withBackgroundColor('#e6e6e6')
      .withFont('bold', '#000000')
      .withMinMaxFont('bold', '#000000')
      .for(this.data.thresholds, (_: SmzGaugeBuilder, threshold: GaugeThreshold) =>
        _
          .addThreshold()
            .withValue(threshold.alert)
            .withColor(threshold.color)
            .gauge
      )
      .build();
  }

}