import { Chart } from 'chart.js';

export interface SmzChartInteractionEvent {
  chart: Chart;
  event: MouseEvent;
  value: any;
}