import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { VERTICAL_BAR, HORIZONTAL_BAR, STACKED_BAR, ROUNDED_BAR, LINE, DOUGHNUT, PIE, POLAR_AREA, COMBO, IAGM } from './data/chart-data-original';
import { COMBO_CHSARP, DOUGHNUT_CSHARP, HORIZONTAL_BAR_CSHARP, IAGM_CSHARP, LINE_CSHARP, PIE_CSHARP, POLAR_AREA_CSHARP, ROUNDED_BAR_CSHARP, STACKED_BAR_CSHARP, VERTICAL_BAR_CSHARP } from './data/chart-data-csharp';
import { COLORS_CHART_DATA } from './data/chart-colors';

@Component({
  selector: 'app-demo-chart-colors',
  templateUrl: './demo-chart-colors.component.html',
})
export class DemoChartColorsComponent {
  public data;
  constructor() {
    this.data = COLORS_CHART_DATA;
  }
}
