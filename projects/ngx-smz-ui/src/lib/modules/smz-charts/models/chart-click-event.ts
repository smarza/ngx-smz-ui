import { Chart } from 'chart.js';

export interface SmzChartClickEvent {
  chart: Chart;
  event: MouseEvent;
  value: any;
}