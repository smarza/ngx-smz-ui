import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { SmzChartClickEvent } from 'ngx-smz-ui';
import { BASIC, VERTICAL_BAR, HORIZONTAL_BAR, STACKED_BAR, ROUNDED_BAR, LINE, DOUGHNUT, PIE, POLAR_AREA, COMBO } from './data/chart-data';

@Component({
  selector: 'app-demo-charts',
  templateUrl: './demo-charts.component.html',
})
export class DemoChartsComponent {
  public basicChart;
  public verticalBarChart;
  public horizontalBarChart;
  public stackedBarChart;
  public roundedBarChart;
  public lineChart;
  public doughnutChart;
  public pieChart;
  public polarArea;
  public combochart;

  constructor() {
    this.basicChart = BASIC;
    this.verticalBarChart = VERTICAL_BAR;
    this.horizontalBarChart = HORIZONTAL_BAR;
    this.stackedBarChart = STACKED_BAR;
    this.roundedBarChart = ROUNDED_BAR;
    this.lineChart = LINE;
    this.doughnutChart = DOUGHNUT;
    this.pieChart = PIE;
    this.polarArea = POLAR_AREA;
    this.combochart = COMBO;
  }

  ngOnInit() {}

  public chartClicked(event: any): void {
    console.log('click: ', event.value);
  }
}
