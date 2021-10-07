import { Component, ViewEncapsulation } from '@angular/core';
import { VERTICAL_BAR, HORIZONTAL_BAR, STACKED_BAR, ROUNDED_BAR, LINE, DOUGHNUT, PIE, POLAR_AREA, COMBO, IAGM, EMPTY } from './data/chart-data-original';
import { COMBO_CHSARP, DOUGHNUT_CSHARP, HORIZONTAL_BAR_CSHARP, IAGM_CSHARP, LINE_CSHARP, PIE_CSHARP, POLAR_AREA_CSHARP, ROUNDED_BAR_CSHARP, STACKED_BAR_CSHARP, VERTICAL_BAR_CSHARP } from './data/chart-data-csharp';
import { SmzChartInteractionEvent } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-charts',
  templateUrl: './demo-charts.component.html',
  styleUrls: ['./demo-charts.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  public emptyChart;

  public iagmChartCsharp;
  public combochartCsharp;
  public lineChartCsharp;
  public roundedBarChartCsharp;
  public stackedBarChartCsharp;
  public horizontalBarChartCsharp;
  public verticalBarChartCsharp;
  public doughnutChartCsharp;
  public pieChartChsarp;
  public polarAreaCsharp;
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
    this.emptyChart = EMPTY;

    this.iagmChartCsharp = IAGM_CSHARP;
    this.combochartCsharp = COMBO_CHSARP;
    this.lineChartCsharp = LINE_CSHARP;
    this.roundedBarChartCsharp = ROUNDED_BAR_CSHARP;
    this.stackedBarChartCsharp = STACKED_BAR_CSHARP;
    this.horizontalBarChartCsharp = HORIZONTAL_BAR_CSHARP;
    this.verticalBarChartCsharp = VERTICAL_BAR_CSHARP;
    this.doughnutChartCsharp = DOUGHNUT_CSHARP;
    this.pieChartChsarp = PIE_CSHARP;
    this.polarAreaCsharp = POLAR_AREA_CSHARP;
  }

  ngOnInit() {}

  public chartClicked(event: SmzChartInteractionEvent<any>): void {
    console.log('click: ', event.value);
  }
}
