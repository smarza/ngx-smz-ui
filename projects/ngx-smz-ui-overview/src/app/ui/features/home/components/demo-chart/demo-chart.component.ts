import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DemoTreeNode } from '@models/demo';
import { SmzChart } from '../../../../../../../../../dist/ngx-smz-ui/lib/modules/smz-charts/models/chart';

@Component({
  selector: 'app-demo-chart',
  template: `
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div>
        <h5>Vertical bar chart - Raw model</h5>
        <smz-ui-chart
          [type]="chart.model.type"
          [data]="chart.model.data"
          [options]="chart.model.config"
          (chartClick)="chartClicked($event)"
        ></smz-ui-chart>
      </div>

      <div>
        <h5>Vertical bar chart - FluentAPI C#</h5>
        <smz-ui-chart
          [type]="chart.cSharp.type"
          [data]="chart.cSharp.data"
          [options]="chart.cSharp.config"
          (chartClick)="chartClicked($event)"
        ></smz-ui-chart>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoChartComponent implements OnInit, OnChanges {

  @Input() public node: DemoTreeNode
  public chart: { model: SmzChart, cSharp: any };

  constructor() { }

  public ngOnInit(): void {
    this.chart = this.node.data() as any;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.node != null) {
      const node = changes.node.currentValue;
      this.chart = node.data();
    }

  }

  public chartClicked(event: any): void {
    console.log('click: ', event.value);
  }
}