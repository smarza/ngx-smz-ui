import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { SmzChartClickEvent } from 'ngx-smz-ui';
import { VERTICAL_BAR, HORIZONTAL_BAR, STACKED_BAR, ROUNDED_BAR, LINE, DOUGHNUT, PIE, POLAR_AREA, COMBO, IAGM } from './data/chart-data-original';
import { COMBO_CHSARP, HORIZONTAL_BAR_CSHARP, IAGM_CSHARP, LINE_CSHARP, ROUNDED_BAR_CSHARP, STACKED_BAR_CSHARP, VERTICAL_BAR_CSHARP } from './data/chart-data-csharp';

@Component({
  selector: 'app-demo-charts',
  templateUrl: './demo-charts.component.html',
})
export class DemoChartsComponent {
  public verticalBarChart;
  public horizontalBarChart;
  public stackedBarChart;
  public roundedBarChart;
  public lineChart;
  public doughnutChart;
  public pieChart;
  public polarArea;
  public combochart;
  public iagmChart;

  public iagmChartCsharp;
  public combochartCsharp;
  public lineChartCsharp;
  public roundedBarChartCsharp;
  public stackedBarChartCsharp;
  public horizontalBarChartCsharp;
  public verticalBarChartCsharp;

  constructor() {
    this.verticalBarChart = VERTICAL_BAR;
    this.horizontalBarChart = HORIZONTAL_BAR;
    this.stackedBarChart = STACKED_BAR;
    this.roundedBarChart = ROUNDED_BAR;
    this.lineChart = LINE;
    this.doughnutChart = DOUGHNUT;
    this.pieChart = PIE;
    this.polarArea = POLAR_AREA;
    this.combochart = COMBO;
    this.iagmChart = IAGM;

    this.iagmChartCsharp = IAGM_CSHARP;
    this.combochartCsharp = COMBO_CHSARP;
    this.lineChartCsharp = LINE_CSHARP;
    this.roundedBarChartCsharp = ROUNDED_BAR_CSHARP;
    this.stackedBarChartCsharp = STACKED_BAR_CSHARP;
    this.horizontalBarChartCsharp = HORIZONTAL_BAR_CSHARP;
    this.verticalBarChartCsharp = VERTICAL_BAR_CSHARP;
  }

  ngOnInit() {}

  public chartClicked(event: any): void {
    console.log('click: ', event.value);
  }
}
