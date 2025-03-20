import { Component } from '@angular/core';
import { COLORS_CHART_DATA } from './data/chart-colors';

@Component({
    selector: 'app-demo-chart-colors',
    templateUrl: './demo-chart-colors.component.html',
    standalone: false
})
export class DemoChartColorsComponent {
  public data;
  constructor() {
    this.data = COLORS_CHART_DATA;
  }
}
